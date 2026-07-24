#!/usr/bin/env python3
"""
compare_surfaces.py — Stage 3 (diff) of the docs-drift skill.

Emits a candidate for every mismatch between documented and source surface.
Deterministic — no curation; triage stays with Stage 4.

Pure stdlib; runs under any Python 3.

source-surface.json schema (Stage 2 must produce this):
{
  "items": [
    {
      "name": "metricsLogPath",
      "kind": "flag|option|api_param|state|enum_value",
      "type": "string|integer|bool|list|...",   # optional
      "defaults": [                              # 0+; >1 entry or condition = conditional
        {"value": "3", "condition": null},
        {"value": "2", "condition": "preExistingDestinationData is enabled"}
      ],
      "allowed_values": ["initialSync", "cea"],
      "constraints": ["only valid on restart"],
      "hidden": false,
      "intent_marker": "external-only",
      "symbol": "...", "file": "...", "line": 0
    }
  ]
}

Output: candidates.json
{ "candidates": [ { kind, source_*, docs_*, evidence, triage_signals } ] }
"""
import argparse
import json
import re
import sys


def norm(s):
    if not s:
        return ""
    s = s.strip().strip("`'\"").lstrip("-")
    return re.sub(r"[^a-z0-9.]", "", s.lower())


def keywords(text):
    stop = {"the", "a", "an", "is", "are", "to", "of", "for", "when", "on",
            "in", "and", "or", "be", "it", "this", "that", "with", "as", "by"}
    return {w for w in re.findall(r"[a-z0-9]+", (text or "").lower())
            if w not in stop and len(w) > 2}


def distinctive(text):
    """Long, non-generic tokens — used so "data"/"destination" in a condition
    doesn't falsely count as coverage of that condition in the docs."""
    generic = {"value", "values", "field", "option", "options", "cluster",
               "clusters", "source", "destination", "data", "default", "true",
               "false", "between", "settings", "enabled", "disabled"}
    return {w for w in keywords(text) if len(w) >= 5 and w not in generic}


# Option prose bearing these phrases discusses its computed/conditional default.
COVERAGE_PHRASES = ["by default", "programmatically", "automatically",
                    "depending on", "depends on", "varies", "computed",
                    "optimiz", "unless", "otherwise"]

# Drop impl/serialization details and type-system null/range guards; keep only
# enforced behavioral restrictions visible to the user.
# Tuned to keep mongosync #12 ("only valid on restart; returns DisableVerificationOnStartError").
NON_CONSTRAINT = re.compile(
    r"serde|deseriali|seriali[sz]|marshal|#\[|\bstruct tag\b|not serialized"
    # C# / Java / Go null guards and range validators — type-system enforcement,
    # not user-visible behavioral restrictions.
    r"|ArgumentNullException|ArgumentOutOfRangeException"
    r"|Ensure\.Is\w+|Objects\.requireNonNull|require[Nn]on[Nn]ull"
    r"|\bmust not be null\b|\bcannot be null\b|\bnot null\b",
    re.I)
ENFORCE_SIGNAL = re.compile(
    r"\b(only|must|cannot|can't|requires?|required|invalid|error|errors?|"
    r"fails?|reject|ignored|mutually exclusive|exclusive with|at most|"
    r"at least|no more than|between|min(?:imum)?|max(?:imum)?|range|"
    r"not allowed|disallow|forbidden|restrict)\b|[<>]=?|\d",
    re.I)


def is_real_constraint(c):
    if not c or NON_CONSTRAINT.search(c):
        return False
    return bool(ENFORCE_SIGNAL.search(c))


SUGGESTED_BY_KIND = {
    "undocumented_surface": "Needs-eng-confirmation",
    "documented_not_in_source": "Confirmed",
    "type_mismatch": "Confirmed",
    "conditional_default_undocumented": "Confirmed",
    "constraint_undocumented": "Confirmed",
    "enum_value_missing": "Confirmed",
}


def suggest_label(kind, src):
    if (src or {}).get("intent_marker"):
        return "Intentional"
    if (src or {}).get("hidden"):
        return "Intentional"
    return SUGGESTED_BY_KIND.get(kind, "Needs-eng-confirmation")


def build_docs_index(docs):
    """Returns (tokens, items_by_name) from extract_docs.py output.
    tokens: normalized set of every documented name/symbol/label.
    items_by_name: normalized option-name -> merged doc item."""
    tokens = set()
    items_by_name = {}
    for page in docs.get("pages", []):
        for s in page.get("symbols", []):
            tokens.add(norm(s.get("text", "")))
        for lab in page.get("labels", []):
            tokens.add(norm(lab.get("name", "")))
        for it in page.get("items", []):
            n = norm(it.get("name", ""))
            if n:
                tokens.add(n)
                cur = items_by_name.setdefault(n, {
                    "name": it.get("name"), "fields": {}, "values": [],
                    "hedged": False, "text": "", "location": None,
                    "provenance": it.get("provenance")})
                cur["fields"].update(it.get("fields") or {})
                for v in it.get("values") or []:
                    if v not in cur["values"]:
                        cur["values"].append(v)
                cur["hedged"] = cur["hedged"] or bool(it.get("hedged"))
                if len(it.get("text") or "") > len(cur["text"]):
                    cur["text"] = it.get("text") or ""
                if cur["location"] is None and it.get("provenance"):
                    cur["location"] = f"{it['provenance']}:{it.get('line')}"
            # Documented enum/state values count as documented surface.
            for v in it.get("values") or []:
                tokens.add(norm(v))
    tokens.discard("")
    return tokens, items_by_name


def cand(kind, src, axis, docs_say, source_say):
    return {
        "kind": kind, "axis": axis,
        "source_name": src.get("name"), "source_kind": src.get("kind"),
        "source_symbol": src.get("symbol"), "source_file": src.get("file"),
        "source_line": src.get("line"),
        "docs_say": docs_say, "source_say": source_say,
        "suggested_label": suggest_label(kind, src),
        "triage_signals": {
            "hidden": bool(src.get("hidden")),
            "intent_marker": src.get("intent_marker"),
        },
    }


def compare(docs, source):
    tokens, by_name = build_docs_index(docs)
    src_names = {norm(it.get("name", "")) for it in source.get("items", [])}
    src_names.discard("")
    candidates = []

    for it in source.get("items", []):
        n = norm(it.get("name", ""))
        if not n:
            continue
        doc = by_name.get(n)
        documented = n in tokens

        # 1) Presence — public source surface absent from the docs entirely.
        if not documented:
            candidates.append(cand(
                "undocumented_surface", it, "presence",
                "Not documented (name absent from all built pages).",
                f"{it.get('kind','surface')} '{it.get('name')}' exists in source."))
            continue  # per-field checks are moot when the name isn't there

        # 2) Type mismatch (only when docs actually state a type).
        dtype = (doc or {}).get("fields", {}).get("type")
        if dtype and it.get("type") and norm(dtype) != norm(it["type"]):
            candidates.append(cand(
                "type_mismatch", it, "type",
                f"Documented type: {dtype}.",
                f"Source type: {it['type']}.") | {
                    "docs_location": (doc or {}).get("location")})

        # 3) Conditional default not reflected in docs.
        conds = [d for d in (it.get("defaults") or []) if d.get("condition")]
        multi = len(it.get("defaults") or []) > 1
        if (conds or multi):
            dtext = (doc or {}).get("text", "")
            low = dtext.lower()
            # Generic word overlap (e.g. "data" in both condition and prose) must not count.
            covered = any(p in low for p in COVERAGE_PHRASES)
            if not covered:
                defrepr = "; ".join(
                    f"{d.get('value')}"
                    + (f" when {d['condition']}" if d.get("condition") else "")
                    for d in it["defaults"])
                candidates.append(cand(
                    "conditional_default_undocumented", it, "default",
                    f"Documented default: {(doc or {}).get('fields',{}).get('default','(none stated)')}; "
                    f"description does not mention the condition.",
                    f"Source defaults: {defrepr}.") | {
                        "docs_location": (doc or {}).get("location")})

        # 4) Constraint not stated in docs.
        dtext = (doc or {}).get("text", "")
        dfields = (doc or {}).get("fields", {})
        ddist = distinctive(dtext)
        for c in it.get("constraints") or []:
            if not is_real_constraint(c):
                continue
            # Covered when docs carry structured min/max fields.
            if re.search(r"\d", c) and (dfields.get("minimum")
                                        or dfields.get("maximum")):
                continue
            # Covered only if ALL distinctive constraint tokens appear in prose.
            cdist = distinctive(c)
            if cdist and cdist <= ddist:
                continue
            candidates.append(cand(
                "constraint_undocumented", it, "constraint",
                "Documented description does not state this constraint.",
                f"Source enforces: {c}.") | {
                    "docs_location": (doc or {}).get("location")})

        # 5) Enum/allowed-value drift — only against a non-hedged value list.
        if it.get("allowed_values") and doc and doc.get("values") \
                and not doc.get("hedged"):
            doc_vals = {norm(v) for v in doc["values"]}
            missing = [v for v in it["allowed_values"]
                       if norm(v) not in doc_vals
                       and not any(norm(v) in norm(dv) for dv in doc["values"])]
            if missing:
                candidates.append(cand(
                    "enum_value_missing", it, "enum",
                    f"Documented values: {doc['values']}.",
                    f"Source allows additional: {missing}.") | {
                        "docs_location": doc.get("location")})

    # 6) Documented option items absent from source (removed/renamed doc-side).
    for n, doc in by_name.items():
        if doc.get("fields") and n not in src_names and n not in {
                norm(x) for x in src_names}:
            # Only flag genuine options: camelCase identifier + type/default field.
            # Excludes Title-Case section headings ("Settings", "Global Options").
            if not re.match(r"^[a-z][A-Za-z0-9]*$", doc.get("name", "")):
                continue
            if {"type", "default"} & set(doc["fields"].keys()):
                candidates.append({
                    "kind": "documented_not_in_source", "axis": "presence",
                    "source_name": None, "source_kind": None,
                    "source_symbol": None, "source_file": None,
                    "source_line": None,
                    "docs_say": f"Documents '{doc['name']}' "
                                f"(fields: {doc['fields']}).",
                    "source_say": "No matching public name found in source.",
                    "suggested_label": "Confirmed",
                    "docs_location": doc.get("location"),
                    "triage_signals": {"hidden": False, "intent_marker": None},
                })

    return candidates


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--docs", required=True, help="extract_docs.py output JSON")
    ap.add_argument("--source", required=True, help="source-surface.json")
    ap.add_argument("--out")
    args = ap.parse_args()

    docs = json.load(open(args.docs))
    source = json.load(open(args.source))
    candidates = compare(docs, source)

    result = {"candidates": candidates}
    text = json.dumps(result, indent=2)
    if args.out:
        open(args.out, "w").write(text)
        print(f"wrote {args.out}: {len(candidates)} candidates", file=sys.stderr)
    else:
        print(text)


if __name__ == "__main__":
    main()
