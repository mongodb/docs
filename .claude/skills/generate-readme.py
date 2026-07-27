#!/usr/bin/env python3
"""Regenerate .claude/skills/README.md from OWNERS.yaml and SKILL.md frontmatter."""

import re
import sys
from pathlib import Path

SKILLS_DIR = Path(__file__).parent
REPO_ROOT = SKILLS_DIR.parent.parent
OWNERS_FILE = SKILLS_DIR / "OWNERS.yaml"
README_FILE = SKILLS_DIR / "README.md"

# Internal infrastructure — excluded from the reference
INTERNAL_SKILLS = {"release-notes-base"}


# Section order and description, keyed by the readme_section value in
# OWNERS.yaml. Skills whose readme_section is missing or doesn't match any
# key here fall into "Other Skills" (appended last, no description).
SECTION_ORDER = [
    ("Universal Skills",
     "Skills every writer should know, regardless of team."),
    ("Grove & Code Examples",
     "For writers working with tested code examples in the Grove platform."),
    ("Release Notes",
     "For writers drafting release notes for specific MongoDB products."),
    ("Drivers / DBX", None),
    ("Ticket Workflows",
     "Skills for triage duty and batch ticket completion."),
    ("Platform & Tooling",
     "For specialized content migration tasks."),
    ("Skill Authoring",
     "For writers reviewing or creating new Claude Code skills."),
    ("Content Fixes",
     "For detecting and fixing linter-flagged issues in content/."),
]

OTHER_SECTION = "Other Skills"

# Entries that don't live under .claude/skills/ (hooks, agents) aren't
# slash commands, so they get their own section and render without a
# leading slash.
TOOLS_SECTION = "Other Tools"

KNOWN_SECTIONS = {name for name, _ in SECTION_ORDER}


def parse_owners():
    """Return ordered list of (name, readme_section, path, description).

    An entry whose readme_section is missing, or set to a value that
    doesn't match a known heading in SECTION_ORDER (e.g. a typo), is
    normalized to OTHER_SECTION here rather than left to build_readme,
    so nothing downstream needs to re-check validity. An entry whose
    path is outside .claude/skills/ is forced into TOOLS_SECTION
    regardless of its readme_section, since it isn't a skill.
    """
    content = OWNERS_FILE.read_text()
    results = []
    for block in re.finditer(
        r"^\s+- name:\s+(\S+)(.*?)(?=^\s+- name:|\Z)",
        content,
        re.MULTILINE | re.DOTALL,
    ):
        name, body = block.group(1), block.group(2)
        section_m = re.search(r"^\s+readme_section:\s*(.+)$", body, re.MULTILINE)
        section = section_m.group(1).strip() if section_m else None
        if section not in KNOWN_SECTIONS:
            section = OTHER_SECTION
        path_m = re.search(r"^\s+path:\s*(.+)$", body, re.MULTILINE)
        path = path_m.group(1).strip() if path_m else f".claude/skills/{name}"
        desc_m = re.search(
            r'^\s+readme_description:\s*"?(.*?)"?\s*$', body, re.MULTILINE
        )
        description = desc_m.group(1).strip() if desc_m else ""
        if not path.startswith(".claude/skills/"):
            section = TOOLS_SECTION
        results.append((name, section, path, description))
    return results


def extract_description(path):
    """Extract and shorten a description from a SKILL.md or flow.md.

    Skills carry theirs in SKILL.md frontmatter; agents carry theirs in
    a <description> block in flow.md.
    """
    entry_dir = REPO_ROOT / path
    skill_md = entry_dir / "SKILL.md"
    if not skill_md.exists():
        flow_md = entry_dir / "flow.md"
        if not flow_md.exists():
            return ""
        m = re.search(
            r"<description>\s*(.*?)\s*</description>",
            flow_md.read_text(),
            re.DOTALL,
        )
        if not m:
            return ""
        return shorten(" ".join(m.group(1).split()))
    content = skill_md.read_text()

    # Quoted inline: description: "text"
    m = re.search(r'^description:\s*"([^"]+)"', content, re.MULTILINE)
    if m:
        text = m.group(1)
    else:
        # Block scalar (> or >-): collect indented continuation lines
        m = re.search(
            r"^description:\s*>-?\s*\n((?:[ \t]+\S[^\n]*\n?)+)",
            content,
            re.MULTILINE,
        )
        if m:
            lines = [l.strip() for l in m.group(1).splitlines() if l.strip()]
            text = " ".join(lines)
        else:
            # Plain unquoted single-line
            m = re.search(r"^description:\s*(.+)", content, re.MULTILINE)
            text = m.group(1).strip() if m else ""

    return shorten(text)


def shorten(text):
    """Trim a description to its first sentence."""
    idx = text.find(". ")
    if idx > 0:
        return text[:idx]
    return text.rstrip(".")


def build_readme(skill_entries):
    """skill_entries: ordered list of (name, readme_section, path, description)."""
    by_section = {}
    for name, section, path, description in skill_entries:
        if name in INTERNAL_SKILLS:
            continue
        by_section.setdefault(section, []).append((name, path, description))

    lines = [
        "# Claude Skills Reference",
        "",
        "Available Claude Code agent skills for the MongoDB Docs team. "
        "Invoke a skill by typing `/skill-name` in Claude Code, "
        "or describe what you want — Claude will pick up the right skill from context.",
        "",
        "For guidelines on building and reviewing skills, "
        "see [Docs Agent Skill Guidelines]"
        "(https://wiki.corp.mongodb.com/pages/viewpage.action?pageId=536510577).",
        "",
        "<!-- Auto-generated from OWNERS.yaml and SKILL.md frontmatter. "
        "Run .claude/skills/generate-readme.py to update. -->",
        "",
    ]

    section_descriptions = dict(SECTION_ORDER)
    ordered_sections = (
        [name for name, _ in SECTION_ORDER] + [OTHER_SECTION, TOOLS_SECTION]
    )

    for section_name in ordered_sections:
        section_skills = by_section.get(section_name)
        if not section_skills:
            continue
        is_tools = section_name == TOOLS_SECTION
        if section_name in (OTHER_SECTION, TOOLS_SECTION):
            section_skills = sorted(section_skills)
        section_desc = section_descriptions.get(section_name)
        lines += [f"## {section_name}", ""]
        if section_desc:
            lines += [section_desc, ""]
        lines += [
            f"| {'Tool' if is_tools else 'Skill'} | What it does |",
            "|---|---|",
        ]
        for name, path, description in section_skills:
            desc = description or extract_description(path)
            label = f"`{name}`" if is_tools else f"`/{name}`"
            lines.append(f"| {label} | {desc} |")
        lines.append("")

    return "\n".join(lines)


if __name__ == "__main__":
    skill_entries = parse_owners()
    content = build_readme(skill_entries)
    README_FILE.write_text(content)
    print(f"Updated {README_FILE}", file=sys.stderr)
