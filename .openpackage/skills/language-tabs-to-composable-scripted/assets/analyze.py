#!/usr/bin/env python3
"""
analyze.py - RST tab-structure analyzer for composable tutorial conversion.

Usage:  python analyze.py <filepath>
Output: JSON to stdout
Exit:   0 on success, 1 on error
"""

import json
import re
import sys
from pathlib import Path

# ── ID mapping tables ─────────────────────────────────────────────────────────

LANGUAGE_IDS = {
    "python": "python",
    "nodejs": "nodejs", "node": "nodejs",
    "java-sync": "java-sync", "java": "java-sync",
    "java-async": "java-async",
    "csharp": "csharp", "dotnet": "csharp",
    "go": "go",
    "kotlin": "kotlin",
    "kotlin-coroutine": "kotlin-coroutine",
    "motor": "motor",
    "php": "php",
    "ruby": "ruby",
    "scala": "scala",
    "c": "c",
    "cpp": "cpp",
    "rust": "rust",
    "swift": "swift",
    "swift-sync": "swift-sync",
    "swift-async": "swift-async",
    "javascript": "nodejs",
    # shell/mongosh in a pure-language context (Case A only)
    "shell": "shell",
    "mongosh": "shell",
}

INTERFACE_IDS = {
    "shell": "shell",
    "mongosh": "shell",
    "compass": "compass",
    "atlas-ui": "atlas-ui", "ui": "atlas-ui",
    "atlas-cli": "atlas-cli", "cli": "atlas-cli",
    "admin-api": "atlas-admin-api", "api": "atlas-admin-api",
    "driver": "driver", "drivers": "driver",
}

DEPLOYMENT_IDS = {
    "atlas": "atlas", "cloud": "atlas",
    "local": "local",
    "self": "self", "self-managed": "self", "on-prem": "self",
}

# IDs that are interface-only (never driver languages)
INTERFACE_ONLY = {k for k in INTERFACE_IDS
                  if k not in {"shell", "mongosh"} or k in INTERFACE_IDS}
INTERFACE_ONLY = {"compass", "atlas-ui", "ui", "atlas-cli", "cli",
                  "admin-api", "api", "driver", "drivers"}

# Lines to remove after conversion
REMOVE_PATTERNS = [
    re.compile(r'^\s*\.\.\s+tabs-selector::'),
    re.compile(r'^\s*\.\.\s+include::\s+/includes/tutorials/language-id\.rst'),
    re.compile(r'^\s*\.\.\s+include::\s+/includes/select-your-language\.rst'),
    re.compile(r'^\s*\.\.\s+include::\s+'
               r'/includes/language-selector-instructions\.rst'),
    re.compile(r'^\s*\.\.\s+include::\s+'
               r'/includes/language-or-shell-selector-instructions\.rst'),
]

# RST patterns
TAB_DIRECTIVE_RE = re.compile(
    r'^( *)\.\. (tabs|tabs-drivers|tabs-selector)::\s*$'
)
TAB_BLOCK_RE = re.compile(r'^( *)\.\. tab::\s*$')
TABID_RE = re.compile(r'^ *:tabid:\s+(.+?)\s*$')
INCLUDE_RE = re.compile(r'^ *\.\. include::\s+(.+?)\s*$')
# Old YAML-style tabs format: "   tabs:\n     - id: shell"
YAML_TABS_RE = re.compile(r'^ *tabs:\s*$')


# ── Helpers ───────────────────────────────────────────────────────────────────

def indent_of(line):
    return len(line) - len(line.lstrip(' '))


def is_blank(line):
    return line.strip() == ''


def block_end(lines, start_idx, parent_indent):
    """Return the last 0-based index that belongs to the block starting at
    start_idx.  A block continues as long as non-blank lines are strictly
    deeper than parent_indent; blank lines are allowed anywhere inside.
    """
    last = start_idx
    i = start_idx + 1
    while i < len(lines):
        if is_blank(lines[i]):
            i += 1
            continue
        if indent_of(lines[i]) <= parent_indent:
            break
        last = i
        i += 1
    return last


# ── Tab block discovery ───────────────────────────────────────────────────────

def find_tab_blocks(lines):
    """Return a list of tab-block dicts (all line numbers are 1-indexed)."""
    blocks = []
    i = 0
    while i < len(lines):
        m = TAB_DIRECTIVE_RE.match(lines[i])
        if not m:
            i += 1
            continue

        dir_indent = len(m.group(1))
        dir_type = m.group(2)
        dir_start = i
        dir_end = block_end(lines, i, dir_indent)

        # Detect old YAML-style format ("   tabs:\n     - id: shell")
        yaml_format = any(
            YAML_TABS_RE.match(lines[k])
            for k in range(i + 1, min(i + 4, dir_end + 1))
        )

        tabs = []
        j = i + 1
        while j <= dir_end:
            tm = TAB_BLOCK_RE.match(lines[j])
            if not tm:
                j += 1
                continue

            tab_indent = len(tm.group(1))
            tab_start = j
            tab_end_idx = block_end(lines, j, tab_indent)

            # Find :tabid:
            tabid = None
            for k in range(j + 1, min(j + 6, tab_end_idx + 1)):
                tid_m = TABID_RE.match(lines[k])
                if tid_m:
                    tabid = tid_m.group(1)
                    break

            # First actual content line (past :tabid: and blank lines)
            content_start = j + 1
            while content_start <= tab_end_idx:
                ln = lines[content_start]
                if not is_blank(ln) and not TABID_RE.match(ln):
                    break
                content_start += 1

            # Detect include-only tab
            is_include_only = False
            include_path = None
            if content_start <= tab_end_idx:
                inc_m = INCLUDE_RE.match(lines[content_start])
                if inc_m:
                    rest_non_blank = [
                        l for l in lines[content_start + 1:tab_end_idx + 1]
                        if not is_blank(l)
                    ]
                    if not rest_non_blank:
                        is_include_only = True
                        include_path = inc_m.group(1)

            # Detect substantial content
            content_lines_count = sum(
                1 for l in lines[content_start:tab_end_idx + 1]
                if not is_blank(l)
            )
            code_blocks = sum(
                1 for l in lines[content_start:tab_end_idx + 1]
                if '.. code-block::' in l or '.. literalinclude::' in l
            )
            procedures = sum(
                1 for l in lines[content_start:tab_end_idx + 1]
                if '.. procedure::' in l
            )
            substantial = (
                content_lines_count > 15
                or code_blocks >= 2
                or procedures > 0
            )

            tabs.append({
                "tabid": tabid,
                "start": tab_start + 1,
                "end": tab_end_idx + 1,
                "content_start": content_start + 1,
                "is_include_only": is_include_only,
                "include_path": include_path,
                "substantial": substantial,
            })
            j = tab_end_idx + 1

        blocks.append({
            "type": dir_type,
            "start": dir_start + 1,
            "end": dir_end + 1,
            "tabs": tabs,
            "yaml_format": yaml_format,
        })
        i = dir_end + 1

    return blocks


# ── Classification ────────────────────────────────────────────────────────────

def classify(all_tabids):
    """Return (case_str, stop_reason).  case_str is 'A', 'B',
    'B-deployment', or None.
    """
    interfaces = [t for t in all_tabids if t in INTERFACE_ONLY]
    has_shell = any(t in {"shell", "mongosh"} for t in all_tabids)
    languages = [t for t in all_tabids
                 if t in LANGUAGE_IDS and t not in INTERFACE_ONLY]
    deployments = [t for t in all_tabids if t in DEPLOYMENT_IDS]
    unknown = [t for t in all_tabids
               if t not in LANGUAGE_IDS
               and t not in INTERFACE_IDS
               and t not in DEPLOYMENT_IDS]

    if unknown:
        return None, f"Unknown tab IDs: {unknown}. Cannot classify page."

    if deployments and (interfaces or has_shell):
        return "B-deployment", None
    # shell/mongosh alongside pure-interface tabs → Case B (shell is an interface)
    if (interfaces or has_shell) and languages and interfaces:
        return "B", None
    # shell/mongosh with only driver languages, no pure-interface tabs → Case A
    # (shell is treated as a language peer, not a separate interface dimension)
    if (languages or has_shell) and not interfaces and not deployments:
        return "A", None
    # shell/mongosh with no driver languages (interface-only page) → Case B
    if (interfaces or has_shell) and not languages and not deployments:
        return "B", None

    return None, "Ambiguous tab structure. Cannot classify as Case A or B."


# ── Composable header builder ─────────────────────────────────────────────────

def build_header(case, all_tabids):
    if case == "A":
        first = LANGUAGE_IDS.get(all_tabids[0], all_tabids[0]) if all_tabids \
            else "nodejs"
        return (
            f".. composable-tutorial::\n"
            f"   :options: language-no-dependencies\n"
            f"   :defaults: {first}"
        )
    if case in ("B", "B-deployment"):
        # For B-deployment, include deployment-type; let Claude adjust defaults
        if case == "B-deployment":
            return (
                ".. composable-tutorial::\n"
                "   :options: deployment-type, interface, language\n"
                "   :defaults: atlas, driver, nodejs"
            )
        return (
            ".. composable-tutorial::\n"
            "   :options: interface, language\n"
            "   :defaults: driver, nodejs"
        )
    return ".. composable-tutorial::\n   :options: TBD\n   :defaults: TBD"


# ── Main analysis ─────────────────────────────────────────────────────────────

def analyze(filepath):
    path = Path(filepath)
    if not path.exists():
        return {"error": f"File not found: {filepath}"}

    text = path.read_text()
    lines = text.splitlines(keepends=True)

    # Existing composable check
    if ".. composable-tutorial::" in text:
        return {
            "file": str(filepath),
            "stop_reason": "File already contains a composable-tutorial directive.",
        }

    # Find tab blocks
    tab_blocks = find_tab_blocks(lines)
    if not tab_blocks:
        return {
            "file": str(filepath),
            "stop_reason": "No tab directives found in this file.",
        }

    # Check for old YAML-format blocks (not supported by the converter)
    yaml_blocks = [b for b in tab_blocks if b.get("yaml_format")]
    if yaml_blocks:
        lines_str = ", ".join(str(b["start"]) for b in yaml_blocks)
        return {
            "file": str(filepath),
            "tab_blocks": tab_blocks,
            "stop_reason": (
                f"Tab block(s) at line(s) {lines_str} use the old YAML-style "
                "tabs format (tabs: / - id:) which this script does not "
                "support. Convert those blocks to the RST .. tab:: format "
                "first, or handle the conversion manually."
            ),
        }

    # Collect unique tab IDs in order of appearance
    seen = set()
    all_tabids = []
    for block in tab_blocks:
        for tab in block["tabs"]:
            if tab["tabid"] and tab["tabid"] not in seen:
                seen.add(tab["tabid"])
                all_tabids.append(tab["tabid"])

    # Classify
    case, stop_reason = classify(all_tabids)
    if stop_reason:
        return {
            "file": str(filepath),
            "tab_blocks": tab_blocks,
            "all_tabids": all_tabids,
            "stop_reason": stop_reason,
        }

    # Composable scope: first tab block start to last tab block end
    scope_start = tab_blocks[0]["start"]
    scope_end = tab_blocks[-1]["end"]

    # Lines to remove
    lines_to_remove = []
    for idx, line in enumerate(lines):
        for pat in REMOVE_PATTERNS:
            if pat.match(line.rstrip("\n")):
                lines_to_remove.append(idx + 1)  # 1-indexed
                break

    # Tabs with substantial inline content
    substantial_tabs = [
        tab["tabid"]
        for block in tab_blocks
        for tab in block["tabs"]
        if tab["substantial"] and not tab["is_include_only"]
    ]

    # Includes inside composable scope
    includes_in_scope = []
    for idx, line in enumerate(lines):
        ln = idx + 1  # 1-indexed
        if scope_start <= ln <= scope_end:
            inc_m = INCLUDE_RE.match(line)
            if inc_m:
                includes_in_scope.append({
                    "line": ln,
                    "path": inc_m.group(1),
                })

    return {
        "file": str(filepath),
        "tab_blocks": tab_blocks,
        "all_tabids": all_tabids,
        "case": case,
        "composable_scope": {"start": scope_start, "end": scope_end},
        "proposed_header": build_header(case, all_tabids),
        "substantial_tabs": substantial_tabs,
        "includes_in_scope": includes_in_scope,
        "lines_to_remove": lines_to_remove,
        "stop_reason": None,
    }


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python analyze.py <filepath>", file=sys.stderr)
        sys.exit(1)

    result = analyze(sys.argv[1])
    print(json.dumps(result, indent=2))
    sys.exit(0 if "error" not in result else 1)
