#!/usr/bin/env python3
"""skill_review_complete.py — bumps last_reviewed for skills covered by a
closed skill-review Jira ticket, then opens a PR for a human to merge.

Triggered by .github/workflows/skill-review-complete.yml via a
repository_dispatch event, which a Jira Automation rule fires when a
skill-review-* ticket transitions to Closed. Only tickets closed with
resolution "Done" (an actual review happened) bump last_reviewed — closures
like "Won't Do" (e.g. an orphaned-DRI ticket) are left alone.

Required env vars:
  ISSUE_KEY      - e.g. DOCSP-62425
  JIRA_BASE_URL  - repo secret JIRA_BASE_URL
  JIRA_API_TOKEN - repo secret JIRA_API_TOKEN
  GH_TOKEN       - provided automatically by Actions (used for gh CLI)
"""

from __future__ import annotations

import datetime
import os
import re
import subprocess

import requests
import yaml

REPO = "10gen/docs-mongodb-internal"
OWNERS_PATH = ".claude/skills/OWNERS.yaml"
ISSUE_KEY = os.environ["ISSUE_KEY"]
JIRA_BASE = os.environ["JIRA_BASE_URL"].rstrip("/")

jira_headers = {
    "Authorization": f"Bearer {os.environ['JIRA_API_TOKEN']}",
    "Content-Type": "application/json",
    "Accept": "application/json",
}

TIMEOUT = 15

# Matches bullet lines from the ticket description built in
# skill-review-notify.yml, e.g.:
#   * review-skill (.claude/skills/review-skill) — last reviewed 2026-04-22, ...
BULLET_RE = re.compile(
    r"^\*\s.+?\((?P<path>[^)]+)\)\s—\slast reviewed (?P<stale_date>\d{4}-\d{2}-\d{2})",
    re.MULTILINE,
)


def run(cmd):
    return subprocess.run(cmd, check=True, capture_output=True, text=True).stdout


def gh(args):
    return run(["gh", *args])


def jira_get(path):
    r = requests.get(f"{JIRA_BASE}/rest/api/2{path}", headers=jira_headers, timeout=TIMEOUT)
    r.raise_for_status()
    return r.json()


def jira_comment(issue_key, body):
    r = requests.post(
        f"{JIRA_BASE}/rest/api/2/issue/{issue_key}/comment",
        headers=jira_headers,
        json={"body": body},
        timeout=TIMEOUT,
    )
    r.raise_for_status()


def main():
    print(f"Fetching {ISSUE_KEY}...")
    issue = jira_get(
        f"/issue/{ISSUE_KEY}?fields=description,labels,resolution,status,components"
    )
    fields = issue["fields"]

    components = [c["name"] for c in fields.get("components", [])]
    if "Agent Skills" not in components:
        print(f"{ISSUE_KEY} is not an Agent Skills ticket ({components}). Skipping.")
        return

    labels = fields.get("labels", [])
    if not any(label.startswith("skill-review-") for label in labels):
        print(f"{ISSUE_KEY} has no skill-review-* label. Skipping.")
        return

    status = (fields.get("status") or {}).get("name")
    if status != "Closed":
        print(f"{ISSUE_KEY} is not Closed (status={status}). Skipping.")
        return

    resolution = (fields.get("resolution") or {}).get("name")
    if resolution is None:
        print(f"{ISSUE_KEY} was closed without a resolution. Skipping.")
        jira_comment(
            ISSUE_KEY,
            "This ticket was closed without a resolution, so last_reviewed "
            "wasn't updated automatically. If the review found nothing to "
            "change, reopen and re-close this ticket with resolution "
            "*Done*.",
        )
        return
    if resolution != "Done":
        print(
            f"{ISSUE_KEY} resolution is '{resolution}', not 'Done' — no review "
            "was actually completed (e.g. Won't Do/Duplicate). Skipping "
            "last_reviewed bump."
        )
        return

    description = fields.get("description") or ""
    stale_dates = dict(BULLET_RE.findall(description))
    if not stale_dates:
        print(f"Could not parse any skill paths from {ISSUE_KEY}'s description. Skipping.")
        return

    print(f"Parsed skill paths: {list(stale_dates)}")

    with open(OWNERS_PATH) as f:
        content = f.read()
    manifest = yaml.safe_load(content)
    known_paths = {skill["path"] for skill in manifest["skills"]}
    dris_by_path = {skill["path"]: skill["dris"][0] for skill in manifest["skills"]}

    today = datetime.date.today().isoformat()
    updated = []
    skipped = []
    already_handled = []
    for path, stale_date in stale_dates.items():
        if path not in known_paths:
            skipped.append(path)
            continue
        # Scope the replacement to this skill's own block: from its `path:`
        # line to its next `last_reviewed:` line. OWNERS.yaml always lists
        # last_reviewed immediately after path for every skill entry, so this
        # can't cross into a neighboring skill's block. Only bump the date if
        # it still matches the stale value frozen into the ticket at filing
        # time — if it's already different, someone updated it via their own
        # PR (e.g. a real content change) since the ticket was filed, and
        # bumping it again here would be redundant (or, if their PR happened
        # to land today, a no-op commit that crashes `git commit`).
        block_re = re.compile(
            rf"(path: {re.escape(path)}\n(?:.*\n)*?\s*last_reviewed: ){re.escape(stale_date)}"
        )
        content, n = block_re.subn(rf"\g<1>{today}", content, count=1)
        if n:
            updated.append(path)
        else:
            already_handled.append(path)

    if already_handled:
        print(
            f"Skipping (last_reviewed already changed since ticket filing, "
            f"likely via a manual PR): {already_handled}"
        )

    if skipped:
        print(
            f"Warning: could not update these paths (not found in OWNERS.yaml, "
            f"or renamed/removed since the ticket was filed): {skipped}"
        )

    if not updated:
        print("No skills updated. Nothing to commit.")
        if already_handled and not skipped:
            jira_comment(
                ISSUE_KEY,
                "last_reviewed for this ticket's skill(s) was already "
                "updated (likely via a manual PR) since this ticket was "
                "filed — no automated PR needed.",
            )
        else:
            jira_comment(
                ISSUE_KEY,
                "Automated review-date update found no matching skill(s) in "
                "OWNERS.yaml to bump — no PR was opened. This can happen if "
                "the skill was renamed or removed since this ticket was "
                "filed.",
            )
        return

    with open(OWNERS_PATH, "w") as f:
        f.write(content)

    branch = f"skill-review-complete-{ISSUE_KEY.lower()}"
    run(["git", "config", "user.name", "github-actions[bot]"])
    run(["git", "config", "user.email", "github-actions[bot]@users.noreply.github.com"])
    run(["git", "checkout", "-b", branch])
    run(["git", "add", OWNERS_PATH])
    run(["git", "commit", "-m", f"{ISSUE_KEY}: Update last_reviewed for {', '.join(updated)}"])
    run(["git", "push", "-u", "origin", branch])

    pr_body = (
        f"Automated update: {ISSUE_KEY} was closed as reviewed with nothing to "
        "change, for:\n\n"
        + "\n".join(f"- `{p}`" for p in updated)
        + f"\n\nBumped `last_reviewed` to {today}."
    )
    dri = dris_by_path[updated[0]]
    pr_args = [
        "pr", "create",
        "--repo", REPO,
        "--title", f"{ISSUE_KEY}: Update last_reviewed for skill review",
        "--body", pr_body,
        "--base", "main",
        "--head", branch,
    ]
    # gh pr create --reviewer only accepts GitHub handles/teams, not email
    # addresses. Some DRIs in OWNERS.yaml are recorded as bare emails (Jira's
    # username format on this instance) with no GitHub handle on file —
    # skip requesting a reviewer for those rather than crashing here after
    # the branch has already been pushed.
    if "@" not in dri:
        pr_args += ["--reviewer", dri]
    pr_url = gh(pr_args).strip()
    print(f"Opened {pr_url}")
    jira_comment(
        ISSUE_KEY,
        f"Opened {pr_url} to update last_reviewed — needs review/merge.",
    )


if __name__ == "__main__":
    main()
