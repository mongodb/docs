#!/usr/bin/env python3
"""
surface_engine.py — the language-agnostic surface engine behind scan_source.py.

Consumes an extractor's raw output (contract: `extract(repo_dir, roots)` returns
{"members", "types", "enums", "endpoints", "notices"} — see SCHEMA.md) and emits
the Stage 2a draft surface: items in the compare_surfaces.py schema plus
endpoint_hints. All structural and shared work lives here — item schema, intent
markers, type index with simple-name ambiguity rules, the dotted nested walker
with cycle guard / hidden inheritance / enum attachment / orphan suppression,
dedup, and endpoint doc_name derivation.

No language knowledge in this file: no Java/Go regexes, no annotation semantics,
no type normalization. Those live in scripts/idioms/<name>.py and are never
imported here. The idiom's raw member records carry the resolved values the
engine consumes (kind, file/line, normalized type, nested-candidate).

Entry point:
    build_surface(extract_output, opts) -> {"items": [...], "endpoint_hints": [...]}
    opts: {"repo_dir", "nested_naming" ("dotted"|"indexed"|"sub-table"),
           "intent_markers", "path_transform", "notices": [sink list]}
"""
import glob
import os
import re

# ---------------------------------------------------------------------------
# Scan settings — wired from opts by build_surface. Matches the old module
# globals: intent markers and the endpoint path transform are pure CLI config.
# ---------------------------------------------------------------------------

_intent_markers = []
_path_transform = {}


def read_text(path):
    try:
        with open(path, "r", encoding="utf-8", errors="replace") as f:
            return f.read()
    except OSError:
        return None


def resolve_files(repo_dir, roots, exts):
    seen, out = set(), []
    for root in roots:
        pattern = root if os.path.isabs(root) else os.path.join(repo_dir, root)
        for path in sorted(glob.glob(pattern, recursive=True)):
            if os.path.isfile(path) and path.endswith(exts):
                if path not in seen:
                    seen.add(path)
                    out.append(path)
    return out


def line_of(text, pos):
    return text.count("\n", 0, pos) + 1


def simple_type_id(raw_type):
    """Bare class name behind a member's declared type — the token used to look
    enum allowed-values up by the type that names them (List<OplogStoreType> ->
    OplogStoreType). Generic word-run token extraction; shared by every idiom."""
    ids = re.findall(r"\w+", raw_type or "")
    return ids[-1] if ids else None


def member_record(name, kind, raw_type, symbol, file, line, confidence,
                  type_=None, member_type=None, owner=None, owner_qualified=None,
                  defaults=None, hidden=False):
    """Raw extractor member record — the engine's consumer contract. The SCHEMA
    fields (name/raw_type/symbol/file/line/confidence/kind/owner/
    owner_qualified) ride alongside the extras the engine cannot derive without
    language knowledge: `type` (already-normalized item type), `member_type`
    (payload-class candidate the nested walk resolves — None when opaque or
    scalar), `defaults`, and `hidden` (structural hidden state from file-level
    conventions). Records carry no walking, dedup, intent, or enum values — the
    engine derives those."""
    return {
        "name": name,
        "raw_type": raw_type,
        "type": type_,
        "member_type": member_type,
        "symbol": symbol,
        "file": file,
        "line": line,
        "confidence": confidence,
        "kind": kind,
        "owner": owner,
        "owner_qualified": owner_qualified,
        "defaults": defaults or [],
        "hidden": hidden,
    }


def make_item(name, kind, file_, line, confidence, symbol, type_=None,
              defaults=None, allowed_values=None, hidden=False,
              intent_marker=None, doc_name=None):
    return {
        "name": name,
        "kind": kind,
        "type": type_,
        "defaults": defaults or [],
        "allowed_values": allowed_values or [],
        "constraints": [],
        "hidden": hidden,
        "intent_marker": intent_marker,
        "symbol": symbol,
        "file": file_,
        "line": line,
        "confidence": confidence,
        "doc_name": doc_name,
    }


def annotate_intent(item, block):
    if item.get("intent_marker") is not None or not _intent_markers:
        return item
    low = (block or "").lower()
    for marker in _intent_markers:
        if marker.lower() in low:
            item["intent_marker"] = marker
            break
    return item


def class_block(lines, line_no):
    """Enclosing type-header window for intent-marker matching. The regexes are
    deliberately multi-idiom (Java class/interface/record + Go type/func/const)
    so the same generic block serves every extractor's intent screening."""
    header = None
    for i in range(max(0, line_no - 14), line_no):
        if re.match(r"\s*(?:public\s+)?(?:class|interface|enum|record)\s+\w", lines[i]) \
                or re.search(r"\b(const|func|type)\s+", lines[i]):
            header = i
    start = max(0, header if header is not None else line_no - 2)
    return "\n".join(lines[start:line_no + 1])


# ---------------------------------------------------------------------------
# Type index. The extractor keys classes by BOTH the qualified "Outer.Inner"
# dotted name and the bare simple name; the engine re-derives the simple keys
# from the qualified ones so a simple name shared by distinct memberful classes
# stays ambiguous (a bare reference then never resolves — the len==1 rule).
# ---------------------------------------------------------------------------


def _register(index, key, entry):
    lst = index.setdefault(key, [])
    if entry not in lst:
        lst.append(entry)


def _type_index(types):
    """class key -> list of {"file", "members"} entries, one per memberful
    class. Qualified keys map one-to-one; simple keys accrete every class whose
    qualified chain ends at that simple name, which is how ambiguity is seen."""
    index = {}
    for key, val in (types or {}).items():
        _register(index, key, val)
        _register(index, key.rsplit(".", 1)[-1], val)
    return index


def _lookup(candidate, index):
    """Resolve a member's payload-class candidate to a scanned class with
    members: prefer the exact "Outer.Inner" path, then the bare simple name when
    exactly one memberful class owns it. Returns (simple_class_name, entries)."""
    if not candidate:
        return None
    exact = index.get(candidate)
    if exact:
        return candidate.rsplit(".", 1)[-1], exact
    simple = candidate.rsplit(".", 1)[-1]
    hits = index.get(simple)
    if hits and len(hits) == 1:
        return simple, hits
    return None


def matching_brace(text, open_pos):
    """Generic string-aware brace matcher shared by the idioms (Java class
    regions, Go struct bodies): returns the index of the brace closing the one
    opened at open_pos, or -1 when unbalanced."""
    depth = 0
    in_str = None
    i = open_pos
    while i < len(text):
        c = text[i]
        if in_str:
            if c == "\\":
                i += 2
                continue
            if c == in_str:
                in_str = None
        elif c in "\"'`":
            in_str = c
        elif c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                return i
        i += 1
    return -1


# ---------------------------------------------------------------------------
# Nested type walking (dotted <parent>.<member> names).
# A nested member whose declared type resolves to a scanned class emits once per
# referencing parent field with the parent chain prefix; the member's standalone
# flat item (which would otherwise diff as a spurious undocumented surface) is
# suppressed (orphan suppression). Members of a hidden parent inherit
# hidden + hint.
# ---------------------------------------------------------------------------


def _child_name(parent_name, member_name, naming):
    if naming == "indexed":
        return parent_name + "[n]." + member_name  # docs' wildcard-index form
    return parent_name + "." + member_name


def _walk_nested(candidate, parent_name, hidden, naming, index, enums, lines_of,
                 _visited=None, _depth=0):
    """Items for a member whose declared type resolves to a scanned class:
    one "<parent>.<member>" item per member (recursively). Empty when the type
    is scalar or unresolved. Sets the dotted/intent/enum surface on children."""
    hit = _lookup(candidate, index)
    if hit is None:
        return []
    cls, entries = hit
    visited = _visited if _visited is not None else set()
    if _depth >= 6 or cls in visited:
        return []  # cycle / runaway generics guard
    visited.add(cls)
    out = []
    for entry in entries:
        rel = entry["file"]
        lines = lines_of(rel)
        for m in entry["members"]:
            child = make_item(
                _child_name(parent_name, m["name"], naming), "field", rel,
                m["line"], m.get("confidence", "auto"), m["symbol"],
                type_=m.get("type"))
            if hidden:
                child["hidden"] = True
                child["confidence"] = "hint"
            simple = simple_type_id(m.get("raw_type"))
            if simple in enums:
                child["allowed_values"] = [c for c in enums[simple]]
            out.append(annotate_intent(child, class_block(lines, m["line"])))
            out.extend(_walk_nested(m.get("member_type"), child["name"], hidden,
                                    naming, index, enums, lines_of,
                                    visited, _depth + 1))
    return out


# ---------------------------------------------------------------------------
# Endpoint hints. The extractor returns route hints as {verb, path, method,
# file, line}; the engine formats them into the draft's checklist items and
# derives doc_name from the CLI path transform.
# ---------------------------------------------------------------------------


def _index_path_suffix(path, transform):
    """apply_path_transform — strip the /api base and map URL placeholders."""
    if not path:
        return None
    out = path
    base = (transform or {}).get("strip_base")
    if base and out.startswith(base):
        out = out[len(base):] or "/"
    for key, val in (transform or {}).get("placeholders", {}).items():
        out = out.replace("{" + key + "}", "{" + val + "}")
    return out


def _endpoint_hints(endpoints):
    out = []
    for e in endpoints or []:
        out.append({
            "name": f"{e['verb']} {e['path']}",
            "kind": "endpoint",
            "symbol": f"{e['verb']} {e['method']}",
            "file": e["file"],
            "line": e["line"],
            "doc_name": _index_path_suffix(e["path"], _path_transform),
        })
    return out


# ---------------------------------------------------------------------------
# build_surface — wire opts, run the walk, dedup, return the draft result.
# ---------------------------------------------------------------------------


def _cached_lines(repo_dir):
    cache = {}

    def get(rel):
        if rel not in cache:
            cache[rel] = (read_text(os.path.join(repo_dir, rel)) or "").split("\n")
        return cache[rel]
    return get


def build_surface(extract_output, opts):
    """extract_output from idioms.<name>.extract(repo_dir, roots) -> draft."""
    global _intent_markers, _path_transform
    opts = opts or {}
    _intent_markers = opts.get("intent_markers") or []
    _path_transform = opts.get("path_transform") or {}
    notices = opts.setdefault("notices", [])
    notices.extend(extract_output.get("notices", []))

    naming = opts.get("nested_naming", "dotted") or "dotted"
    emit_nested = naming in ("dotted", "indexed")
    enums = extract_output.get("enums", {})
    index = _type_index(extract_output.get("types"))
    lines_of = _cached_lines(opts.get("repo_dir") or "")

    # Classes referenced as the declared type of a scanned field are NESTED
    # surface: their members emit dotted under each referencing parent, and the
    # member classes' own standalone flat items are suppressed below.
    used_as_nested = set()
    if emit_nested:
        for m in extract_output.get("members", []):
            if m.get("kind") == "field" and m.get("member_type"):
                hit = _lookup(m["member_type"], index)
                if hit:
                    used_as_nested.add(hit[0])

    items = []
    for m in extract_output.get("members", []):
        if m.get("kind") == "field" and emit_nested \
                and m.get("owner") in used_as_nested:
            continue  # nested member; reached via the dotted parent walk
        item = make_item(m["name"], m["kind"], m["file"], m["line"],
                         m["confidence"], m["symbol"], type_=m.get("type"),
                         defaults=m.get("defaults"))
        if m.get("hidden"):
            item["hidden"] = True  # confidence is extractor-final (see member_record)
        if m.get("kind") == "field":
            simple = simple_type_id(m.get("raw_type"))
            if simple in enums:
                item["allowed_values"] = [c for c in enums[simple]]
        annotate_intent(item, class_block(lines_of(m["file"]), m["line"]))
        items.append(item)
        if emit_nested and m.get("kind") == "field" and m.get("member_type"):
            items.extend(_walk_nested(m["member_type"], m["name"],
                                      bool(m.get("hidden")), naming, index, enums,
                                      lines_of))

    # dedup by (name, file) — same rule as Stage 2's final wrap
    seen, deduped = set(), []
    for it in items:
        key = (it.get("name"), it.get("file"))
        if key in seen:
            continue
        seen.add(key)
        deduped.append(it)

    return {"items": deduped, "endpoint_hints": _endpoint_hints(
        extract_output.get("endpoints", []))}
