#!/usr/bin/env python3
"""
go_flags.py — the Go / struct-tag recognition idiom for scan_source.py.

Pure language recognition: cli.*Flag literal blocks (Name / Value / Hidden),
JSON/bson struct tags and lowerCamel field-name derivation, const-string
resolution for const-reference flag names, and struct-body field extraction.
The extractor emits RAW member records per the contract (see SCHEMA.md); the
engine (surface_engine.build_surface) does all walking, dedup, intent marking,
and output writing. mongosync emits no nested members, so the type map it
returns is empty and nothing walks.

extract(repo_dir, roots) -> {"members", "types": {}, "enums": {},
                             "endpoints": [], "notices"}
"""
import os
import re

from surface_engine import line_of, matching_brace, member_record, read_text, \
    resolve_files

GO_EXT = (".go",)

_CLI_FLAG_NAME = re.compile(r"\bcli\.(?P<ftype>\w+)Flag\s*\{")
_FLAG_NAME = re.compile(r"\bName\s*:\s*(?:[\"']([^\"']*)[\"']|([A-Za-z_][\w.]*))")
_FLAG_VALUE = re.compile(r"\bValue\s*:\s*([^,}\n]+)")
_FLAG_HIDDEN = re.compile(r"\bHidden\s*:\s*(true|false)\b")
_GO_CONST_STR = re.compile(r"^\s*(?:const\s+)?(\w+)\s*=\s*\"([^\"]*)\"\s*$", re.M)
_GO_STRUCT_HEAD = re.compile(r"^\s*type\s+(\w+)\s+struct\s*\{", re.M)
_GO_JSON_TAG = re.compile(r'json:"([^"]*)"')
_GO_FIELD_LINE = re.compile(
    r"^\s*(?P<name>[A-Z]\w*)\s+(?P<type>[\w<>.*.\[\]]+)\s*(?P<tag>`[^`]*`)?\s*(?://.*)?$")

GO_FLAG_TYPE = {
    "Bool": "boolean", "Boolean": "boolean",
    "Int": "integer", "Int64": "integer", "IntSlice": "integer",
    "Uint": "integer", "Float64": "number",
    "String": "string", "StringSlice": "string",
    "Duration": "number",
}


def go_type(raw):
    s = (raw or "").strip()
    if not s:
        return None
    if re.match(r"^map\s*\[", s, re.I):
        return "object"
    if s.startswith("[]"):
        return "array of strings" if s == "[]string" else "array of objects"
    if s in ("bool",):
        return "boolean"
    if s in ("int", "int32", "int64", "uint", "uint32", "uint64", "byte"):
        return "integer"
    if s in ("float32", "float64"):
        return "number"
    if s == "string":
        return "string"
    return None


def go_flag_bodies(text):
    bodies = []
    for m in _CLI_FLAG_NAME.finditer(text):
        close = matching_brace(text, m.end() - 1)
        if close < 0:
            continue
        bodies.append({
            "ftype": m.group("ftype"),
            "body": text[m.end():close],
            "line": line_of(text, m.start()),
        })
    return bodies


def go_consts(files):
    consts = {}
    for fn in files:
        text = read_text(fn)
        if text is None:
            continue
        for key, val in _GO_CONST_STR.findall(text):
            consts[key] = val
    return consts


def go_decap(name):
    """Go exported field name -> lowerCamel wire name, using Go's leading-acronym
    rule so `URLParam`->`urlParam`, `Source`->`source`, `ID`->`id`."""
    i = 0
    while i < len(name) and name[i].isupper():
        i += 1
    if i == len(name):
        return name.lower()                     # ALL-CAPS acronym
    if i > 1 and name[i].islower():
        return name[:i].lower() + name[i:]      # acronym prefix + lower tail
    return name[:1].lower() + name[1:]          # plain first-rune decap


def go_field_name(name, tag):
    """JSON wire name for a struct field: the json tag when it names one (but
    `json:"-"`), else the lowerCamel form of the exported Go field name — which
    is the wire name for mongosync's untagged `ms-production:`/bson structs
    (e.g. `StartRequest.Source` is the documented `source` start parameter)."""
    if tag:
        jt = _GO_JSON_TAG.search(tag)
        if jt:
            parts = jt.group(1).split(",")
            if parts[0] == "-":
                return None
            if parts[0]:
                return parts[0]
    return go_decap(name)


def _flag_default(body):
    vm = _FLAG_VALUE.search(body)
    if not vm:
        return None, "missing"
    v = vm.group(1).strip()
    if v.lower() in ("true", "false"):
        return v, "literal"         # bool literals are trustworthy defaults
    if v.lower() in ("0", "nil", '""', "''"):
        return None, v.lower()      # zero/unset sentinels — the real (possibly
                                    # conditional) default lives elsewhere
    # Go identifiers / const refs (e.g. `Value: constants.X`) are not literals we
    # can trust as a default; emit nothing and let Stage 2b fill them in.
    if re.match(r"^[A-Za-z_][\w.]*$", v):
        return None, "nonliteral"
    # strip surrounding quotes for string literals
    if (v.startswith('"') and v.endswith('"')) or (v.startswith("'") and v.endswith("'")):
        return v[1:-1], "literal"
    return v, "literal"


def extract(repo_dir, roots):
    files = resolve_files(repo_dir, roots, GO_EXT)
    consts = go_consts(files)
    members, notices = [], []
    for fn in files:
        text = read_text(fn)
        if text is None:
            continue
        rel = os.path.relpath(fn, repo_dir).replace("\\", "/")
        if rel.endswith("_test.go"):
            continue  # test structs are never shipped public surface
        under_hiddenflags = "hiddenflags" in rel
        # 1) cli.*Flag block literals (flag name / default / hidden marker).
        for flag in go_flag_bodies(text):
            fname_m = _FLAG_NAME.search(flag["body"])
            if not fname_m:
                continue
            const_ref = fname_m.group(2)
            if const_ref is not None:
                # qualified refs like constants.MetricsLogPath resolve by the last
                # segment against the scanned const map
                simple = const_ref.split(".")[-1]
                name = consts.get(simple, const_ref)
                resolved = simple in consts
            else:
                name = fname_m.group(1)
                resolved = True
            default, dk = _flag_default(flag["body"])
            if dk in ("0", "nil", "missing"):
                notices.append(
                    f"HUMAN-VERIFY default: flag '{name}' at {rel}:{flag['line']} — "
                    f"value is {dk}; the real (possibly conditional) default may live "
                    "in a constants file (e.g. loadLevel).")
            defaults = [{"value": default, "condition": None}] \
                if default is not None else []
            hidden = bool(_FLAG_HIDDEN.search(flag["body"])) or under_hiddenflags
            members.append(member_record(
                name, "flag", flag["ftype"], name, rel, flag["line"],
                "auto" if resolved else "hint",
                type_=GO_FLAG_TYPE.get(flag["ftype"]), member_type=None,
                defaults=defaults, hidden=hidden))
            if not resolved:
                notices.append(
                    f"hint flag '{name}' at {rel}:{flag['line']} — Name is a const ref "
                    f"not resolved within --roots; verify in Stage 2b.")
        # 2) struct fields — json-tagged AND untagged exported fields. Untagged
        #    fields use the lowerCamel Go name (mongosync's `ms-production:""` /
        #    bson-tagged API structs serialize by field name, e.g. `Source` is the
        #    documented `/start` parameter `source`).
        for sm in _GO_STRUCT_HEAD.finditer(text):
            close = matching_brace(text, sm.end() - 1)
            if close < 0:
                continue
            struct_name = sm.group(1)
            offset = sm.end()
            for bl in text[sm.end():close].split("\n"):
                f_line = line_of(text, offset)
                fm = _GO_FIELD_LINE.match(bl)
                if fm:
                    field_name = go_field_name(fm.group("name"), fm.group("tag"))
                    if field_name is not None:
                        members.append(member_record(
                            field_name, "field", fm.group("type"), fm.group("name"),
                            rel, f_line, "auto", type_=go_type(fm.group("type")),
                            member_type=None, owner=struct_name,
                            hidden=under_hiddenflags))
                offset += len(bl) + 1
    return {
        "members": members,
        "types": {},
        "enums": {},
        "endpoints": [],
        "notices": notices,
    }
