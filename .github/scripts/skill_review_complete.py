#!/usr/bin/env python3
"""skill_review_complete.py — bumps last_reviewed for skills covered by a
closed skill-review Jira ticket, then opens a PR for a human to merge.

Triggered by .github/workflows/skill-review-complete.yml via a
repository_dispatch event, which a ScriptRunner Script Listener on Jira DC
fires when a skill-review-* ticket transitions to Closed (NOT an Automation
for Jira rule — see .github/jira-automation/README.md). Only tickets closed with
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


# Env vars are read at call time, not import time, so the module can be
# imported without Jira credentials.
def jira_base():
    return os.environ["JIRA_BASE_URL"].rstrip("/")


def jira_headers():
    return {
        "Authorization": f"Bearer {os.environ['JIRA_API_TOKEN']}",
        "Content-Type": "application/json",
        "Accept": "application/json",
    }


def jira_get(path):
    r = requests.get(f"{jira_base()}/rest/api/2{path}", headers=jira_headers(), timeout=TIMEOUT)
    r.raise_for_status()
    return r.json()


def jira_comment(issue_key, body):
    r = requests.post(
        f"{jira_base()}/rest/api/2/issue/{issue_key}/comment",
        headers=jira_headers(),
        json={"body": body},
        timeout=TIMEOUT,
    )
    r.raise_for_status()


def bump_last_reviewed(content, manifest, path, stale_date, today):
    """Bump one skill's last_reviewed in OWNERS.yaml text from stale_date to today.

    Returns (content, status), where status is "updated", "already_handled"
    (the entry's date no longer matches the stale date frozen into the ticket,
    e.g. a manual PR bumped it), or "missing" (no such skill, or the entry has
    no last_reviewed). Content is unchanged unless status is "updated".
    """
    entry = next((s for s in manifest["skills"] if s["path"] == path), None)
    if entry is None or "last_reviewed" not in entry:
        return content, "missing"
    # Decide from the parsed value, not a text match. PyYAML parses unquoted
    # ISO dates as datetime.date; str() gives the same ISO form either way.
    if str(entry["last_reviewed"]) != stale_date:
        return content, "already_handled"
    # The manifest confirms this entry holds stale_date, so the regex only
    # rewrites it: from the entry's own `path:` line (anchored, so commented
    # header examples don't match) to the first last_reviewed line after it.
    block_re = re.compile(
        rf"^([ \t]*path: {re.escape(path)}\n(?:(?![ \t]*last_reviewed:).*\n)*?"
        rf"[ \t]*last_reviewed: ){re.escape(stale_date)}$",
        re.MULTILINE,
    )
    new_content, n = block_re.subn(rf"\g<1>{today}", content, count=1)
    if n != 1:
        raise RuntimeError(
            f"OWNERS.yaml parses {path} as last_reviewed {stale_date}, but the "
            "text didn't match the expected `path:` / `last_reviewed:` layout "
            "(quoted values?). Not guessing; update it by hand."
        )
    return new_content, "updated"


def main():
    issue_key = os.environ["ISSUE_KEY"]
    print(f"Fetching {issue_key}...")
    issue = jira_get(
        f"/issue/{issue_key}?fields=description,labels,resolution,status,components"
    )
    fields = issue["fields"]

    components = [c["name"] for c in fields.get("components", [])]
    if "Maverick" not in components:
        print(f"{issue_key} is not a Maverick skill-review ticket ({components}). Skipping.")
        return

    labels = fields.get("labels", [])
    if not any(label.startswith("skill-review-") for label in labels):
        print(f"{issue_key} has no skill-review-* label. Skipping.")
        return

    status = (fields.get("status") or {}).get("name")
    if status != "Closed":
        print(f"{issue_key} is not Closed (status={status}). Skipping.")
        return

    resolution = (fields.get("resolution") or {}).get("name")
    if resolution is None:
        print(f"{issue_key} was closed without a resolution. Skipping.")
        jira_comment(
            issue_key,
            "This ticket was closed without a resolution, so last_reviewed "
            "wasn't updated automatically. If the review found nothing to "
            "change, reopen and re-close this ticket with resolution "
            "*Done*.",
        )
        return
    if resolution != "Done":
        print(
            f"{issue_key} resolution is '{resolution}', not 'Done' — no review "
            "was actually completed (e.g. Won't Do/Duplicate). Skipping "
            "last_reviewed bump."
        )
        return

    description = fields.get("description") or ""
    stale_dates = dict(BULLET_RE.findall(description))
    if not stale_dates:
        print(f"Could not parse any skill paths from {issue_key}'s description. Skipping.")
        return

    print(f"Parsed skill paths: {list(stale_dates)}")

    with open(OWNERS_PATH) as f:
        content = f.read()
    manifest = yaml.safe_load(content)
    dris_by_path = {skill["path"]: skill["dris"][0] for skill in manifest["skills"]}

    # Only bump a date that still matches the stale value frozen into the
    # ticket at filing time. If it's different, someone updated it via their
    # own PR since the ticket was filed, and bumping it again would be
    # redundant (or, if their PR landed today, a no-op commit that crashes
    # `git commit`).
    today = datetime.date.today().isoformat()
    results = {"updated": [], "already_handled": [], "missing": []}
    for path, stale_date in stale_dates.items():
        content, status = bump_last_reviewed(content, manifest, path, stale_date, today)
        results[status].append(path)
    updated = results["updated"]
    already_handled = results["already_handled"]
    skipped = results["missing"]

    if already_handled:
        print(
            f"Skipping (last_reviewed already changed since ticket filing, "
            f"likely via a manual PR): {already_handled}"
        )

    if skipped:
        print(
            f"Warning: could not update these paths (not found in OWNERS.yaml, "
            f"renamed/removed since the ticket was filed, or missing "
            f"last_reviewed): {skipped}"
        )

    if not updated:
        print("No skills updated. Nothing to commit.")
        if already_handled and not skipped:
            jira_comment(
                issue_key,
                "last_reviewed for this ticket's skill(s) was already "
                "updated (likely via a manual PR) since this ticket was "
                "filed — no automated PR needed.",
            )
        else:
            jira_comment(
                issue_key,
                "Automated review-date update found no matching skill(s) in "
                "OWNERS.yaml to bump — no PR was opened. This can happen if "
                "the skill was renamed or removed since this ticket was "
                "filed.",
            )
        return

    with open(OWNERS_PATH, "w") as f:
        f.write(content)

    branch = f"skill-review-complete-{issue_key.lower()}"
    run(["git", "config", "user.name", "github-actions[bot]"])
    run(["git", "config", "user.email", "github-actions[bot]@users.noreply.github.com"])
    run(["git", "checkout", "-b", branch])
    run(["git", "add", OWNERS_PATH])
    run(["git", "commit", "-m", f"{issue_key}: Update last_reviewed for {', '.join(updated)}"])
    run(["git", "push", "-u", "origin", branch])

    pr_body = (
        f"Automated update: {issue_key} was closed as reviewed with nothing to "
        "change, for:\n\n"
        + "\n".join(f"- `{p}`" for p in updated)
        + f"\n\nBumped `last_reviewed` to {today}."
    )
    dri = dris_by_path[updated[0]]
    pr_args = [
        "pr", "create",
        "--repo", REPO,
        "--title", f"{issue_key}: Update last_reviewed for skill review",
        "--body", pr_body,
        "--base", "main",
        "--head", branch,
    ]
    # gh pr create --reviewer only accepts GitHub handles/teams. Every
    # `dris` entry is a key in OWNERS.yaml's `people:` table, so it is a
    # GitHub handle — but skip the reviewer request rather than crashing
    # here if an entry is malformed, since the branch is already pushed.
    if "@" not in dri:
        pr_args += ["--reviewer", dri]
    pr_url = gh(pr_args).strip()
    print(f"Opened {pr_url}")
    jira_comment(
        issue_key,
        f"Opened {pr_url} to update last_reviewed — needs review/merge.",
    )


if __name__ == "__main__":
    main()
