#!/usr/bin/env python3
"""
java_jaxrs.py — the JAX-RS / Jackson recognition idiom for scan_source.py.

Pure language recognition: @JsonProperty field/getter/setter names, @QueryParam/
@PathParam/@FormParam params with @DefaultValue, enum constants, string-constant
resolution for @JsonProperty(CONST) args, class-region detection, and @Path/@verb
route hints. The extractor emits RAW member records per the contract (see
SCHEMA.md); the engine (surface_engine.build_surface) does all walking, dedup,
intent marking, enum attachment, and output writing.

extract(repo_dir, roots) -> {
  "members":   [raw member records, per-file in emission order],
  "types":     {class key -> {"file": rel, "members": [records]}}, keyed by BOTH
               the qualified "Outer.Inner" name and the bare simple name,
               only for classes carrying @JsonProperty members,
  "enums":     {enum name -> [constant strings]},
  "endpoints": [{verb, path, method, file, line}],
  "notices":   [stderr notices in emission order],
}
"""
import os
import re

from surface_engine import line_of, matching_brace, read_text, resolve_files, \
    member_record

JAVA_EXT = (".java",)

# ---------------------------------------------------------------------------
# Type normalization. Raw "Map<String,String>" types left in place are what
# generated hundreds of false "type_mismatch" -> Confirmed candidates. Unknown
# / custom types normalize to None -> no type asserted -> no candidate.
# ---------------------------------------------------------------------------

JAVA_TYPE_NORM = [
    (re.compile(r"^List\s*<\s*String\s*>$", re.I), "array of strings"),
    (re.compile(r"^(List|Set|Collection|Iterable)\s*<", re.I), "array of objects"),
    (re.compile(r"^Map\s*<", re.I), "object"),
    (re.compile(r"^(Integer|Long|Short|Byte|int|long|short|byte)$", re.I), "integer"),
    (re.compile(r"^(BigDecimal|Double|Float|double|float)$", re.I), "number"),
    (re.compile(r"^Boolean$|^boolean$", re.I), "boolean"),
    (re.compile(r"^String\s*\[.*\]$", re.I), "array of strings"),
    (re.compile(r"^(String|CharSequence|URI|Uri)$", re.I), "string"),
]


def java_type(raw):
    s = (raw or "").strip()
    if not s:
        return None
    m = re.match(r"^Optional\s*<\s*(.+?)\s*>$", s)
    if m:
        s = m.group(1)
    for pat, norm in JAVA_TYPE_NORM:
        if pat.match(s):
            return norm
    return None


# @JsonProperty["x"] / @JsonProperty(Const) / bare @JsonProperty, then up to two
# line breaks, then optional modifiers, then "Type name" (field, record component
# or method). Bounded separation so a far-away declaration never matches. The
# trailing delimiter distinguishes a field (`, ; =`) from a method (`(`).
_JAVA_FIELD_RE = re.compile(
    r"@JsonProperty"
    r"(?:\(\s*[\"'](?P<value>[^\"']*)[\"']\s*\)|\(\s*(?P<const>[A-Za-z_]\w*)\s*\))?"
    r"[ \t]*(?:\r?\n[ \t]*){0,2}"
    r"(?:(?:final|private|protected|public|static)\s+)*"
    r"(?P<type>[\w<>?$.,\[\] ]+?)\s+"
    r"(?P<decl>[A-Za-z_]\w*)\s*(?P<delim>[,;=()])")

# Java string constants used as @JsonProperty(...) args, e.g.
#   private static final String AWS_ACCESS_KEY_FIELD = "awsAccessKey";
_JAVA_CONST_STR = re.compile(r"(?:static\s+|final\s+)?String\s+(\w+)\s*=\s*\"([^\"]*)\"")

_JAVA_ENUM_HEAD = re.compile(r"\benum\s+(\w+)\s*\{")

# @QueryParam("name")|@PathParam("name"), then <=2 line breaks, optional final,
# then "Type param," — bounded so it stays on the method's own parameter list.
_JAVA_PARAM_RE = re.compile(
    r"@(?P<ann>QueryParam|PathParam|FormParam)\s*\(\s*[\"'](?P<name>[^\"']*)[\"']\s*\)"
    r"(?:\s*@\w+(?:\([^)]*\))?)*"      # co-annotations (@DefaultValue, @NotNull) can follow the param annotation
    r"[ \t]*(?:\r?\n[ \t]*){0,2}"
    r"(?:final\s+)?"
    r"(?P<type>[\w<>?$.,\[\] ]+?)\s+(?P<decl>\w+)\s*(?:,|\))")
_JAVA_DEFAULT_RE = re.compile(r"@DefaultValue\s*\(\s*[\"']([^\"']*)[\"']\s*\)")

_JAVA_AT_PATH = re.compile(r"@Path\s*\(\s*[\"']([^\"']*)[\"']\s*\)")
_JAVA_VERB = re.compile(r"@(GET|POST|PUT|PATCH|DELETE|HEAD)\b")
_JAVA_METHOD_SIG = re.compile(
    r"(?:public|protected|private)?\s*(?:static\s+)?(?:final\s+)?"
    r"[\w<>?$.,\[\] ]+?\s+(?P<name>\w+)\s*\(")

# Class declarations (top-level or nested) at the start of a logical line, used
# to scope @JsonProperty matches to the class that owns them and to resolve a
# field's declared type to the model/view class whose members it serializes.
_JAVA_CLASS_RE = re.compile(
    r"^\s*(?:(?:public|protected|private|static|final|abstract)\s+)*"
    r"(?:class|record)\s+(\w+)", re.M)

# Field types whose members the docs enumerate as <parent>.<member>: a single
# List/Set/Collection/Iterable wrapper around a payload class (maps and scalars
# are never walked — a Map is an opaque object, a scalar has no members).
_LIST_WRAP = re.compile(r"^(?:List|Set|Collection|Iterable)\s*<(.+)>$", re.I)
_IDENT_CHAIN = re.compile(r"^[A-Za-z_]\w*(?:\.[A-Za-z_]\w*)*$")


# First parameter of a setter signature, e.g. "final OplogStoreType pType)":
# _JAVA_FIELD_RE captures a method's RETURN type, which is `void` for the
# @JsonProperty setters this idiom uses — the real member type is the parameter.
_JAVA_PARAM_TYPE_RE = re.compile(
    r"\s*(?:final\s+)?(?P<ptype>[\w<>?$.,\[\] ]+?)\s+[A-Za-z_]\w*\s*\)")


def _member_raw_type(text, m):
    """Declared type for a @JsonProperty member match. For a setter whose
    captured type is `void` (or blank), read the first parameter's type from
    the signature that follows the match instead."""
    raw = m.group("type")
    if m.group("delim") == "(" and (raw or "").strip() in ("void", ""):
        pm = _JAVA_PARAM_TYPE_RE.match(text, m.end("delim"))
        if pm:
            return pm.group("ptype")
    return raw


def _member_type(raw):
    """The payload class behind a field's declared type when its members should
    be walked: strips Optional<..> and one List/Set/Collection/Iterable wrapper
    and returns the bare (possibly dotted Outer.Inner) class name. Returns None
    for maps, scalars, and unrecognized generics — those are opaque or leaf."""
    s = (raw or "").strip()
    m = re.match(r"^Optional\s*<\s*(.+?)\s*>$", s)
    if m:
        s = m.group(1)
    m = _LIST_WRAP.match(s)
    if m:
        s = m.group(1).strip()
    return s if _IDENT_CHAIN.match(s) else None


def java_enums(text):
    """enum -> [bare constants] capped at the first ';' (enum terminator) so
    method bodies / switch labels in the same type never leak through. The
    constant list is comma-split and each segment's leading token must be an
    UPPER_SNAKE identifier, so multi-line and constructor-arg enums both work."""
    enums = {}
    for m in _JAVA_ENUM_HEAD.finditer(text):
        rest = text[m.end():]
        cap = rest.find(";")
        end = rest.find("}")
        limit = cap if cap >= 0 else end
        body = rest[:limit] if limit >= 0 else rest
        consts = []
        for part in body.split(","):
            ident = re.match(r"\s*([A-Za-z_]\w*)", part)
            if ident:
                # Ops Manager's brs enums use lowerCamelCase constants
                # (s3blockstore, fileSystemStore), not just UPPER_SNAKE.
                consts.append(ident.group(1))
        if consts:
            enums[m.group(1)] = consts
    return enums


def java_consts(text):
    """simple const name -> literal string value (qualified refs resolve later)."""
    return {name: val for name, val in _JAVA_CONST_STR.findall(text)}


def _owner_at(regions, pos):
    """(simple, qualified) of the deepest class/record region containing `pos`.
    Regions nest in source order, so the deepest is the LAST region covering it."""
    owner, qualified = None, None
    for name, qual, start, end in regions:
        if start <= pos < end:
            owner, qualified = name, qual
    return owner, qualified


def java_field_members(text, rel, private, regions, constmap, ambiguous):
    """@JsonProperty -> raw member records, json-name deterministic per Jackson:

    * literal @JsonProperty("x") -> name x            (auto, even on getters/setters)
    * bare   @JsonProperty       -> name = field name (auto; Jackson uses member name)
    * const  @JsonProperty(C)    -> name = C's value when resolvable (auto) — getter/
                                    setter annotations (e.g. @JsonProperty(AWS_KEY_FIELD))
    Unresolved const -> dropped, and counted for a per-file notice: getters/setters are
    real surface, but a method-borrowed name would be wrong; the agent fills them."""
    members = []
    unresolved = 0
    for m in _JAVA_FIELD_RE.finditer(text):
        value = m.group("value")
        const_arg = m.group("const")
        is_method = m.group("delim") == "("
        if value is not None:
            name, conf = value, "auto"
        elif const_arg is not None:
            simple = re.findall(r"[\w]+", const_arg)[-1]
            resolved = constmap.get(simple)
            if resolved is not None and simple not in ambiguous:
                name, conf = resolved, "auto"
            elif not is_method:
                # const on a field is unusual; fall back to field name, flagged
                name, conf = m.group("decl"), "hint"
            else:
                unresolved += 1
                continue
        else:
            if is_method:
                continue  # bare @JsonProperty on a method — no trustworthy name
            name, conf = m.group("decl"), "auto"  # Jackson: field name == json name
        raw_type = _member_raw_type(text, m)
        if private:
            # Structural hidden state (path under _private/, ApiPrivate* class):
            # the flat item is hidden and, like the current behavior, the hint
            # confidence flags it for Stage 2b mount verification.
            conf = "hint"
        owner, owner_qualified = _owner_at(regions, m.start())
        members.append(member_record(
            name, "field", raw_type, m.group("decl"), rel, line_of(text, m.start()),
            conf, type_=java_type(raw_type), member_type=_member_type(raw_type),
            owner=owner, owner_qualified=owner_qualified, hidden=private))
    return members, unresolved


def java_param_members(text, rel, regions):
    members = []
    for m in _JAVA_PARAM_RE.finditer(text):
        line = line_of(text, m.start())
        window = "\n".join(text.split("\n")[max(0, line - 3):line + 1])
        dv = _JAVA_DEFAULT_RE.search(window)
        defaults = [{"value": dv.group(1), "condition": None}] if dv else []
        owner, owner_qualified = _owner_at(regions, m.start())
        members.append(member_record(
            m.group("name"), "api_param", m.group("type"), m.group("decl"),
            rel, line, "auto", type_=java_type(m.group("type")),
            member_type=None, owner=owner, owner_qualified=owner_qualified,
            defaults=defaults))
    return members


def java_endpoints(fn, text):
    lines = text.split("\n")
    # The first @Path in a JAX-RS resource file is the class base path (method
    # @Paths always follow the class declaration).
    cm = _JAVA_AT_PATH.search(text)
    class_path = cm.group(1) if cm else None
    hints = []
    for row, elem in enumerate(lines, 1):
        vm = _JAVA_VERB.search(elem)
        if not vm:
            continue
        verb = vm.group(1)
        method_path = None
        method_name = None
        for j in range(row, min(row + 6, len(lines) + 1)):
            pm = _JAVA_AT_PATH.search(lines[j - 1])
            if pm:
                method_path = pm.group(1)
            sm = _JAVA_METHOD_SIG.search(lines[j - 1])
            if sm:
                method_name = sm.group("name")
                break
        if not method_name:
            continue
        full = _join_paths(class_path, method_path)
        hints.append({"verb": verb, "path": full, "method": method_name,
                      "file": fn, "line": row})
    return hints


def _join_paths(class_path, method_path):
    base = (class_path or "").rstrip("/")
    sub = (method_path or "").strip()
    if not sub:
        return base or "/"
    if sub.startswith("/"):
        return base + sub
    return base + "/" + sub


# ---------------------------------------------------------------------------
# Class regions and the type map.
# ---------------------------------------------------------------------------


def _java_class_regions(text):
    """[(name, qualified, start, end)] for every class/record, in source order.
    `qualified` is the dotted enclosing-class chain ("Outer.Inner"). `end` is the
    class BODY's closing brace — or the next class declaration when the two
    differ — so a trailing nested class never swallows the outer class's
    remaining members (BackupGroupConfig's SnapshotStoreFilter is the last
    nested class, and the outer class's kmipClientCert*/privateLinkEnabled
    getters follow it in the file). Regions nest, and the deepest enclosing
    class of any offset is the LAST region covering it."""
    offsets, names = [], []
    for m in _JAVA_CLASS_RE.finditer(text):
        names.append(m.group(1))
        offsets.append(m.start())
    regions = []
    for i, name in enumerate(names):
        brace = text.find("{", offsets[i])
        body_end = matching_brace(text, brace) + 1 if brace >= 0 else -1
        next_decl = offsets[i + 1] if i + 1 < len(offsets) else len(text)
        ends = [e for e in (body_end, next_decl) if e >= 0]
        end = min(ends) if ends else len(text)
        outer = [r[0] for r in regions if r[2] <= offsets[i] < r[3]]
        regions.append((name, ".".join(outer + [name]), offsets[i], end))
    return regions


def _region_members(text, rel, start, end, constmap, ambiguous, owner,
                    owner_qualified):
    """@JsonProperty surface scoped to one class region, mirroring
    java_field_members' naming rules so the dotted member name equals what the
    flat scan would have emitted for that field (unresolvable @JsonProperty(CONST)
    chosen with the same field-name fallback / drop rules)."""
    out = []
    region = text[start:end]
    for m in _JAVA_FIELD_RE.finditer(region):
        value, const_arg = m.group("value"), m.group("const")
        is_method = m.group("delim") == "("
        if value is not None:
            name, conf = value, "auto"
        elif const_arg is not None:
            simple = re.findall(r"[\w]+", const_arg)[-1]
            resolved = constmap.get(simple)
            if resolved is not None and simple not in ambiguous:
                name, conf = resolved, "auto"
            elif not is_method:
                name, conf = m.group("decl"), "hint"
            else:
                continue
        else:
            if is_method:
                continue
            name, conf = m.group("decl"), "auto"
        raw_type = _member_raw_type(region, m)
        out.append(member_record(
            name, "field", raw_type, m.group("decl"), rel,
            line_of(text, start + m.start()), conf, type_=java_type(raw_type),
            member_type=_member_type(raw_type), owner=owner,
            owner_qualified=owner_qualified))
    return out


def _java_type_map(files, texts, repo_dir, constmap, ambiguous):
    """class key -> {"file": rel, "members": [records]} for every scanned class
    that carries @JsonProperty members. Keyed by BOTH the exact qualified name
    ("Outer.Inner") and the bare simple name, so a field type resolves either
    way; a simple name shared by distinct memberful classes stays ambiguous
    unless qualified (the engine re-derives the simple keys from the qualified
    ones and applies the len==1 rule)."""
    types = {}
    for fn in files:
        text = texts.get(fn)
        if text is None:
            continue
        rel = os.path.relpath(fn, repo_dir).replace("\\", "/")
        for name, qual, start, end in _java_class_regions(text):
            members = _region_members(text, rel, start, end, constmap, ambiguous,
                                      name, qual)
            if not members:
                continue
            entry = {"file": rel, "members": members}
            types[qual] = entry
            types[name] = entry
    return types


# ---------------------------------------------------------------------------
# extract — the contract entry point.
# ---------------------------------------------------------------------------


def extract(repo_dir, roots):
    files = resolve_files(repo_dir, roots, JAVA_EXT)
    texts = {fn: read_text(fn) for fn in files}
    enums = {}
    constmap = {}
    ambiguous = set()
    for text in texts.values():
        if text is None:
            continue
        enums.update(java_enums(text))
        for key, val in java_consts(text).items():
            if key in constmap and constmap[key] != val:
                ambiguous.add(key)
            else:
                constmap.setdefault(key, val)
    types = _java_type_map(files, texts, repo_dir, constmap, ambiguous)
    members, notices, endpoints = [], [], []
    for fn in files:
        text = texts.get(fn)
        if text is None:
            continue
        rel = os.path.relpath(fn, repo_dir).replace("\\", "/")
        under_private = "_private/" in rel
        has_private_class = bool(re.search(r"\bApiPrivate[A-Z]\w*", text))
        if under_private or has_private_class:
            notices.append(
                f"HUMAN-VERIFY hidden: {rel}"
                + (" (path under _private/)" if under_private else "")
                + (" (class name ApiPrivate*)" if has_private_class else "")
                + " — verify it is not mounted on /api/public/v1.0 before hiding.")
        regions = _java_class_regions(text)
        fields, unresolved = java_field_members(
            text, rel, under_private or has_private_class, regions,
            constmap, ambiguous)
        if unresolved:
            notices.append(
                f"{unresolved} unresolved @JsonProperty(CONST) items in {rel} — "
                "getter/setter surface; resolve the const value in Stage 2b.")
        members.extend(fields)
        members.extend(java_param_members(text, rel, regions))
        endpoints.extend(java_endpoints(rel, text))
    return {
        "members": members,
        "types": types,
        "enums": enums,
        "endpoints": endpoints,
        "notices": notices,
    }
