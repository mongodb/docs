#!/usr/bin/env python3
"""Regenerate .claude/skills/README.md from OWNERS.yaml and SKILL.md frontmatter."""

import re
import sys
from pathlib import Path

SKILLS_DIR = Path(__file__).parent
OWNERS_FILE = SKILLS_DIR / "OWNERS.yaml"
README_FILE = SKILLS_DIR / "README.md"

# Internal infrastructure — excluded from the reference
INTERNAL_SKILLS = {"release-notes-base"}


# Section groupings: (heading, description, [skill names])
SECTIONS = [
    (
        "Universal Skills",
        "Skills every writer should know, regardless of team.",
        ["jira", "open-pr", "staging-preview", "local-build-check",
         "add-redirects", "unified-toc", "version-update"],
    ),
    (
        "Grove & Code Examples",
        "For writers working with tested code examples in the Grove platform.",
        ["grove-setup", "grove-create", "grove-migrate",
         "grove-run", "grove-test", "grove-maintain"],
    ),
    (
        "Release Notes",
        "For writers drafting release notes for specific MongoDB products.",
        ["compass-release-notes", "drivers-release-notes",
         "mongosh-release-notes", "mcp-release-notes"],
    ),
    ("Drivers / DBX", None, ["drivers-ticket-assistant"]),
    (
        "Ticket Workflows",
        "Skills for triage duty and batch ticket completion.",
        ["triage", "captain-v2"],
    ),
    (
        "Platform & Tooling",
        "For specialized content migration tasks.",
        ["language-tabs-to-composable-scripted"],
    ),
    (
        "Skill Authoring",
        "For writers reviewing or creating new Claude Code skills.",
        ["review-skill"],
    ),
]


def parse_owners():
    """Return ordered list of skill names from OWNERS.yaml."""
    content = OWNERS_FILE.read_text()
    return re.findall(r"^\s+- name:\s+(\S+)", content, re.MULTILINE)


def extract_description(skill_name):
    """Extract and shorten the description from SKILL.md frontmatter."""
    skill_md = SKILLS_DIR / skill_name / "SKILL.md"
    if not skill_md.exists():
        return ""
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

    # Shorten to first sentence
    idx = text.find(". ")
    if idx > 0:
        return text[:idx]
    return text.rstrip(".")


def build_readme(skill_names):
    covered = set()
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

    for section_name, section_desc, section_skills in SECTIONS:
        lines += [f"## {section_name}", ""]
        if section_desc:
            lines += [section_desc, ""]
        lines += [
            "| Skill | What it does |",
            "|---|---|",
        ]
        for skill_name in section_skills:
            covered.add(skill_name)
            desc = extract_description(skill_name)
            lines.append(f"| `/{skill_name}` | {desc} |")
        lines.append("")

    # Any skill in OWNERS.yaml not covered by a section (and not internal)
    uncovered = [s for s in skill_names if s not in covered and s not in INTERNAL_SKILLS]
    if uncovered:
        lines += ["## Other Skills", ""]
        lines += [
            "| Skill | What it does |",
            "|---|---|",
        ]
        for skill_name in sorted(uncovered):
            desc = extract_description(skill_name)
            lines.append(f"| `/{skill_name}` | {desc} |")
        lines.append("")

    return "\n".join(lines)


if __name__ == "__main__":
    skill_names = parse_owners()
    content = build_readme(skill_names)
    README_FILE.write_text(content)
    print(f"Updated {README_FILE}", file=sys.stderr)
