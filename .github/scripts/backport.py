#!/usr/bin/env python3
"""Open a backport PR for a merged docs PR.

Triggered by .github/workflows/backport.yml when a PR merges into main.

Logic:
  1. Read the merged PR's labels and changed files via gh.
  2. For each label that maps to a versioned project in
     .github/backport-config.yml, enumerate sibling version directories
     (excluding configured EOL versions).
  3. For each changed file under content/<project>/<source-version>/,
     apply the change to every eligible sibling version:
       - Added files are mirrored to all target versions.
       - Modified files are copied only when the file already exists
         in the target (absence implies version-gated content).
       - Removals and renames apply only when the original path exists
         in the target.
  4. Commit the copied changes to a backport branch and open one PR.

Outputs (written to $GITHUB_OUTPUT):
  branch     - the backport branch name (empty if no PR opened)
  pr_number  - the new PR number (empty if no PR opened)
  lint_files - space-separated list of backported file paths for
               lint-docs.sh to check.
"""

from __future__ import annotations

import json
import os
import shutil
import subprocess
import sys
from pathlib import Path

import yaml

REPO_ROOT = Path(__file__).resolve().parents[2]
CONFIG_PATH = REPO_ROOT / ".github" / "backport-config.yml"


def run(cmd: list[str], **kwargs) -> str:
    result = subprocess.run(
        cmd, cwd=REPO_ROOT, check=True, capture_output=True, text=True, **kwargs
    )
    return result.stdout


def gh(args: list[str]) -> str:
    return run(["gh", *args])


def set_output(key: str, value: str) -> None:
    out = os.environ.get("GITHUB_OUTPUT")
    if not out:
        print(f"{key}={value}")
        return
    with open(out, "a") as f:
        f.write(f"{key}={value}\n")


def load_config() -> dict:
    with open(CONFIG_PATH) as f:
        return yaml.safe_load(f) or {}


def get_pr_metadata(pr_number: str, repo: str) -> tuple[list[str], list[dict]]:
    """Return (labels, files) for the PR. files are {path, status, previous_filename}.

    gh pr view --json files omits status and previous_filename, so files are
    fetched via the REST API which includes full file metadata.
    """
    labels_raw = gh(["pr", "view", pr_number, "--repo", repo, "--json", "labels"])
    labels = [lbl["name"] for lbl in json.loads(labels_raw).get("labels", [])]

    files_raw = gh(
        ["api", f"repos/{repo}/pulls/{pr_number}/files", "--paginate", "--jq", ".[]"]
    )
    files = []
    for line in files_raw.splitlines():
        if not line.strip():
            continue
        entry = json.loads(line)
        # REST API uses 'filename'; normalise to 'path' for the rest of the script.
        entry["path"] = entry.pop("filename", entry.get("path", ""))
        files.append(entry)
    return labels, files


def apply_patch(merge_sha: str, source_rel: str, target_rel: str) -> bool:
    """Apply the diff for source_rel from merge_sha onto target_rel.

    Returns True if the patch applied cleanly, False otherwise.
    """
    diff = run(["git", "diff", f"{merge_sha}^1", merge_sha, "--", source_rel])
    if not diff:
        return False
    patched = diff.replace(f"a/{source_rel}", f"a/{target_rel}").replace(
        f"b/{source_rel}", f"b/{target_rel}"
    )
    try:
        subprocess.run(
            ["git", "apply", "--"],
            cwd=REPO_ROOT,
            input=patched,
            check=True,
            capture_output=True,
            text=True,
        )
        return True
    except subprocess.CalledProcessError:
        return False


def project_for_path(path: str) -> tuple[str | None, str | None, str | None]:
    """Return (project, version, relative_path) for a content path, or (None, None, None)."""
    parts = path.split("/")
    if len(parts) < 4 or parts[0] != "content":
        return None, None, None
    project, version = parts[1], parts[2]
    project_dir = REPO_ROOT / "content" / project
    candidate = project_dir / version
    if not candidate.is_dir():
        return None, None, None
    # Versioned project = at least one sibling version dir alongside `version`.
    siblings = [
        p for p in project_dir.iterdir() if p.is_dir() and p.name != version
    ]
    if not siblings:
        return None, None, None
    relative = "/".join(parts[3:])
    return project, version, relative


def eligible_targets(
    project: str, source_version: str, config: dict
) -> list[str]:
    project_dir = REPO_ROOT / "content" / project
    excludes = set(
        (config.get("exclude_versions") or {}).get(project, [])
    )
    targets = []
    for child in sorted(project_dir.iterdir()):
        if not child.is_dir():
            continue
        if child.name == source_version:
            continue
        if child.name in excludes:
            continue
        targets.append(child.name)
    return targets


def apply_change(
    project: str,
    source_version: str,
    target_version: str,
    relative: str,
    status: str,
    previous_relative: str | None,
    merge_sha: str = "",
) -> tuple[str | None, list[str]]:
    """Apply a single file change to the target version.

    Returns (display_str | None, paths_to_stage). display_str is None
    when the change was skipped.
    """
    base = REPO_ROOT / "content" / project
    target_path = base / target_version / relative
    source_path = base / source_version / relative

    if status == "added":
        # Mirror new files to every eligible target version. Writers can
        # drop ones that shouldn't apply during PR review.
        target_path.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source_path, target_path)
        display = str(target_path.relative_to(REPO_ROOT))
        return display, [display]

    if status in {"modified", "changed"}:
        # Only apply when the file already exists in the target version.
        # Absence there is meaningful — likely intentionally deleted or
        # version-gated content. Don't resurrect it.
        if not target_path.exists():
            return None, []
        target_rel = str(target_path.relative_to(REPO_ROOT))
        source_rel = f"content/{project}/{source_version}/{relative}"
        if merge_sha and apply_patch(merge_sha, source_rel, target_rel):
            return target_rel, [target_rel]
        # Fallback: copy whole file if patch doesn't apply cleanly.
        target_path.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source_path, target_path)
        return target_rel, [target_rel]

    if status == "removed":
        if target_path.exists():
            target_path.unlink()
            display = str(target_path.relative_to(REPO_ROOT))
            return display, [display]
        return None, []

    if status == "renamed" and previous_relative:
        old_target = base / target_version / previous_relative
        # Only act if the original path existed in the target version.
        if not old_target.exists():
            return None, []
        target_path.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source_path, target_path)
        old_target.unlink()
        new_rel = str(target_path.relative_to(REPO_ROOT))
        old_rel = str(old_target.relative_to(REPO_ROOT))
        display = f"{new_rel} (renamed from {previous_relative})"
        return display, [new_rel, old_rel]

    return None, []


def main() -> int:
    pr_number = os.environ["PR_NUMBER"]
    pr_title = os.environ["PR_TITLE"]
    pr_author = os.environ["PR_AUTHOR"]
    base_ref = os.environ.get("PR_BASE_REF", "main")
    repo = os.environ["REPO"]
    merge_sha = os.environ.get("PR_MERGE_SHA", "")

    config = load_config()
    label_map = config.get("label_map") or {}
    label_to_project = {v: k for k, v in label_map.items()}

    labels, files = get_pr_metadata(pr_number, repo)
    triggered_projects = {
        label_to_project[label]
        for label in labels
        if label in label_to_project
    }
    if not triggered_projects:
        print("No versioned-project labels on PR. Nothing to backport.")
        return 0

    # Group changes per (project, source_version, target_version).
    # results[(project, target)] = list of (status, summary_string)
    applied: dict[tuple[str, str], list[str]] = {}
    skipped: list[str] = []
    lint_paths: list[str] = []
    stage_paths: list[str] = []
    processed: set[tuple[str, str, str]] = set()

    for entry in files:
        path = entry["path"]
        status = entry.get("status", "modified")
        previous = entry.get("previous_filename")
        project, source_version, relative = project_for_path(path)
        if project is None or project not in triggered_projects:
            continue

        targets = eligible_targets(project, source_version, config)
        if not targets:
            continue

        # previous_filename from the REST API is a full repo-relative path;
        # strip the project/version prefix so apply_change receives a path
        # relative to the version directory.
        previous_relative = None
        if previous:
            prefix = f"content/{project}/{source_version}/"
            previous_relative = (
                previous[len(prefix):] if previous.startswith(prefix) else previous
            )

        for target in targets:
            key = (project, target, relative)
            if key in processed:
                continue
            processed.add(key)
            display, staged = apply_change(
                project, source_version, target, relative, status, previous_relative, merge_sha
            )
            if display is None:
                reason = {
                    "modified": "not present in target",
                    "changed": "not present in target",
                    "removed": "already absent in target",
                    "renamed": "original path absent in target",
                }.get(status, "not applicable")
                skipped.append(f"{path} → {project}/{target} ({reason})")
                continue
            applied.setdefault((project, target), []).append(display)
            stage_paths.extend(staged)
            clean_path = display.split(" (renamed", 1)[0]
            if clean_path.endswith(".txt") or clean_path.endswith(".rst") or clean_path.endswith(".yaml"):
                lint_paths.append(clean_path)

    if not applied:
        print("No backportable changes found. Skipping PR creation.")
        return 0

    branch = f"backport/pr-{pr_number}"
    run(["git", "checkout", "-b", branch])
    run(["git", "add", "--"] + stage_paths)
    run(
        [
            "git",
            "-c", "commit.gpgsign=false",
            "commit",
            "-m",
            f"Backport #{pr_number}: {pr_title}",
        ]
    )
    run(["git", "push", "-u", "origin", branch])

    body_lines = [
        f"Backports the changes from #{pr_number} to sibling version directories.",
        "",
        "## What was copied",
        "",
    ]
    for (project, target), paths in sorted(applied.items()):
        body_lines.append(f"**`content/{project}/{target}/`**")
        for p in paths:
            body_lines.append(f"- `{p}`")
        body_lines.append("")

    if skipped:
        body_lines.append("## Skipped")
        body_lines.append("")
        body_lines.append(
            "These files did not exist in the target version and were "
            "not backported. Review whether the new content should be "
            "added manually:"
        )
        body_lines.append("")
        for s in skipped:
            body_lines.append(f"- {s}")
        body_lines.append("")

    body_lines.extend(
        [
            "## Review",
            "",
            f"Original author: @{pr_author}",
            "",
            "Lint results (`./lint-docs.sh all`) will be posted as a comment "
            "once the workflow completes.",
        ]
    )
    body = "\n".join(body_lines)

    pr_url = gh(
        [
            "pr",
            "create",
            "--repo",
            repo,
            "--base",
            base_ref,
            "--head",
            branch,
            "--title",
            f"Backport #{pr_number}: {pr_title}",
            "--body",
            body,
            "--assignee",
            pr_author,
            "--draft",
        ]
    ).strip()

    new_pr_number = pr_url.rstrip("/").split("/")[-1]
    set_output("branch", branch)
    set_output("pr_number", new_pr_number)
    set_output("lint_files", " ".join(lint_paths))
    print(f"Opened backport PR: {pr_url}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
