#!/usr/bin/env python3
"""Open one backport PR per target version for a merged docs PR.

Triggered by .github/workflows/backport.yml when a PR merges into main.

Logic:
  1. Read the merged PR's labels and changed files via gh.
  2. For each label in the format backport-<project>-<version> that matches a
     project prefix in .github/backport-config.yml, record the explicit target
     version. Only versions named in a backport label are targeted — the script
     never backports to all versions by default.
  3. For each changed file under content/<project>/<source-version>/,
     apply the change to every explicitly requested target version:
       - Added files are mirrored to all target versions.
       - Modified files are copied only when the file already exists
         in the target (absence implies version-gated content).
       - Removals and renames apply only when the original path exists
         in the target.
  4. Commit the copied changes to a per-version backport branch and open one
     PR per target version.
  5. Post a comment on the original PR with a results table — a checkmark for
     each successfully created PR, an X for any version that had conflicts and
     requires a manual backport.

Outputs (written to $GITHUB_OUTPUT):
  branches   - space-separated list of backport branch names
  pr_numbers - space-separated list of new PR numbers
  lint_files - space-separated list of backported file paths for
               lint-docs.sh to check.
"""

from __future__ import annotations

import json
import os
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


def remote_branch_sha(branch: str) -> str | None:
    """Return branch's current commit SHA on origin, or None if it doesn't exist."""
    result = subprocess.run(
        ["git", "ls-remote", "origin", f"refs/heads/{branch}"],
        cwd=REPO_ROOT,
        check=True,
        capture_output=True,
        text=True,
    )
    line = result.stdout.strip()
    return line.split()[0] if line else None


def has_staged_changes() -> bool:
    """Return True if there are staged changes to commit."""
    result = subprocess.run(
        ["git", "diff", "--staged", "--quiet"], cwd=REPO_ROOT, check=False
    )
    return result.returncode != 0


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


def read_blob_at(sha: str, rel_path: str) -> bytes:
    """Return rel_path's contents exactly as they were at the given commit.

    The backport branch is created from the live tip of base_ref (so the
    resulting PR diffs cleanly), which can be ahead of merge_sha by the time
    this runs — especially on a re-trigger long after the original merge.
    Reading content straight off disk would silently pick up whatever else
    landed on source_version in the meantime. Pinning reads to merge_sha
    keeps a backport limited to exactly what the original PR changed.
    """
    result = subprocess.run(
        ["git", "show", f"{sha}:{rel_path}"],
        cwd=REPO_ROOT,
        check=True,
        capture_output=True,
    )
    return result.stdout


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


def requested_targets(
    project: str, source_version: str, config: dict, explicit_versions: list[str]
) -> list[str]:
    """Return the subset of explicit_versions that are valid targets.

    Filters out the source version, configured EOL exclusions, and version
    directories that don't exist on disk.
    """
    project_dir = REPO_ROOT / "content" / project
    excludes = set(
        (config.get("exclude_versions") or {}).get(project, [])
    )
    targets = []
    for version in explicit_versions:
        if version == source_version:
            continue
        if version in excludes:
            print(f"  Skipping excluded version: {project}/{version}")
            continue
        if not (project_dir / version).is_dir():
            print(f"  Warning: {project}/{version} does not exist on disk, skipping")
            continue
        targets.append(version)
    return targets


def apply_change(
    project: str,
    source_version: str,
    target_version: str,
    relative: str,
    status: str,
    previous_relative: str | None,
    merge_sha: str = "",
) -> tuple[str | None, list[str], bool]:
    """Apply a single file change to the target version.

    Returns (display_str | None, paths_to_stage, had_conflict).

    display_str is None when the change was skipped or failed.
    had_conflict is True when a patch failed to apply (not merely absent from
    the target), meaning the writer must backport this file manually.
    """
    base = REPO_ROOT / "content" / project
    target_path = base / target_version / relative
    source_rel = f"content/{project}/{source_version}/{relative}"

    if status == "added":
        # Mirror new files to every eligible target version. Writers can
        # drop ones that shouldn't apply during PR review. Read the blob at
        # merge_sha rather than the live file so later, unrelated commits to
        # source_version aren't pulled in by a re-trigger.
        target_path.parent.mkdir(parents=True, exist_ok=True)
        target_path.write_bytes(read_blob_at(merge_sha, source_rel))
        display = str(target_path.relative_to(REPO_ROOT))
        return display, [display], False

    if status in {"modified", "changed"}:
        # Only apply when the file already exists in the target version.
        # Absence there is meaningful — likely intentionally deleted or
        # version-gated content. Don't resurrect it.
        if not target_path.exists():
            return None, [], False
        target_rel = str(target_path.relative_to(REPO_ROOT))
        if merge_sha and apply_patch(merge_sha, source_rel, target_rel):
            return target_rel, [target_rel], False
        # Patch failed to apply — this is a conflict, not a skip.
        return None, [], True

    if status == "removed":
        if target_path.exists():
            target_path.unlink()
            display = str(target_path.relative_to(REPO_ROOT))
            return display, [display], False
        return None, [], False

    if status == "renamed" and previous_relative:
        old_target = base / target_version / previous_relative
        # Only act if the original path existed in the target version.
        if not old_target.exists():
            return None, [], False
        target_path.parent.mkdir(parents=True, exist_ok=True)
        target_path.write_bytes(read_blob_at(merge_sha, source_rel))
        old_target.unlink()
        new_rel = str(target_path.relative_to(REPO_ROOT))
        old_rel = str(old_target.relative_to(REPO_ROOT))
        display = f"{new_rel} (renamed from {previous_relative})"
        return display, [new_rel, old_rel], False

    return None, [], False


def post_comment(repo: str, pr_number: str, body: str) -> None:
    """Post a comment on the given PR."""
    gh(["pr", "comment", pr_number, "--repo", repo, "--body", body])


def main() -> int:
    pr_number = os.environ["PR_NUMBER"]
    pr_title = os.environ["PR_TITLE"]
    pr_author = os.environ["PR_AUTHOR"]
    pr_merged_by = os.environ.get("PR_MERGED_BY", "")
    base_ref = os.environ.get("PR_BASE_REF", "main")
    repo = os.environ["REPO"]
    merge_sha = os.environ.get("PR_MERGE_SHA", "")

    config = load_config()
    label_map = config.get("label_map") or {}

    labels, files = get_pr_metadata(pr_number, repo)

    # Parse backport-<project>-<version> labels into {project: [version, ...]}.
    # The label_map values are label prefixes (e.g. "backport-manual"), so a
    # label like "backport-manual-v8.0" matches prefix "backport-manual" and
    # names target version "v8.0".
    project_targets: dict[str, list[str]] = {}
    sorted_label_map = sorted(label_map.items(), key=lambda x: len(x[1]), reverse=True)
    for label in labels:
        for project, prefix in sorted_label_map:
            expected_prefix = prefix + "-"
            if label.startswith(expected_prefix):
                version = label[len(expected_prefix):]
                if version:
                    project_targets.setdefault(project, []).append(version)
                break

    if not project_targets:
        print("No backport-<project>-<version> labels on PR. Nothing to backport.")
        return 0

    # Build pending changes grouped by (project, target_version).
    # pending[(project, target)] = list of (source_version, relative, status, previous_relative)
    pending: dict[tuple[str, str], list[tuple[str, str, str, str | None]]] = {}
    processed_keys: set[tuple[str, str, str]] = set()

    for entry in files:
        path = entry["path"]
        status = entry.get("status", "modified")
        previous = entry.get("previous_filename")
        project, source_version, relative = project_for_path(path)
        if project is None or project not in project_targets:
            continue

        targets = requested_targets(
            project, source_version, config, project_targets[project]
        )
        if not targets:
            continue

        # previous_filename from the REST API is a full repo-relative path;
        # strip the project/version prefix so apply_change receives a path
        # relative to the version directory.
        previous_relative = None
        if previous:
            pfx = f"content/{project}/{source_version}/"
            previous_relative = (
                previous[len(pfx):] if previous.startswith(pfx) else previous
            )

        for target in targets:
            key = (project, target, relative)
            if key in processed_keys:
                continue
            processed_keys.add(key)
            pending.setdefault((project, target), []).append(
                (source_version, relative, status, previous_relative)
            )

    if not pending:
        print("No backportable changes found. Skipping PR creation.")
        return 0

    # Determine the assignee once (reused for every PR).
    # GitHub rejects bot accounts as assignees. When the author is a bot
    # (e.g. sage-bot), fall back to whoever merged the original PR so a human
    # owns the backport. Skip assignment entirely if neither is a human.
    assignee = pr_author if not pr_author.endswith("[bot]") else pr_merged_by
    if assignee and assignee.endswith("[bot]"):
        assignee = ""

    # Determine who to @-mention in comments (same human-fallback logic).
    mention = pr_author if not pr_author.endswith("[bot]") else pr_merged_by
    if mention and mention.endswith("[bot]"):
        mention = ""

    # Process each (project, target_version) independently, creating one PR
    # per version.  result_rows records (label, pr_url_or_none, conflict_files)
    # for the summary comment posted on the original PR.
    result_rows: list[tuple[str, str | None, list[str]]] = []
    all_lint_paths: list[str] = []
    all_branches: list[str] = []
    all_pr_numbers: list[str] = []

    for (project, target_version), changes in sorted(pending.items()):
        label = f"content/{project}/{target_version}"
        branch = f"backport/pr-{pr_number}-{project}-{target_version}"

        print(f"\nProcessing backport to {label} ...")

        # If this branch already exists (a prior trigger created it), build on
        # top of its current tip instead of recreating it from scratch — that
        # way a re-trigger never needs a force-push and any commits a writer
        # added directly to the branch survive. Otherwise branch fresh from
        # origin/base_ref so the new branch's PR diffs cleanly against base.
        branch_existed = remote_branch_sha(branch) is not None
        if branch_existed:
            run(["git", "fetch", "origin", branch])
            run(["git", "checkout", "-B", branch, "FETCH_HEAD"])
        else:
            run(["git", "checkout", "-b", branch, f"origin/{base_ref}"])

        applied: list[str] = []
        conflict_files: list[str] = []
        skipped: list[str] = []
        stage_paths: list[str] = []
        lint_paths: list[str] = []

        for source_version, relative, status, previous_relative in changes:
            display, staged, had_conflict = apply_change(
                project, source_version, target_version, relative,
                status, previous_relative, merge_sha,
            )
            if had_conflict:
                conflict_files.append(
                    f"content/{project}/{source_version}/{relative}"
                )
            elif display is None:
                reason = {
                    "modified": "not present in target",
                    "changed": "not present in target",
                    "removed": "already absent in target",
                    "renamed": "original path absent in target",
                }.get(status, "not applicable")
                skipped.append(
                    f"content/{project}/{source_version}/{relative} ({reason})"
                )
            else:
                applied.append(display)
                stage_paths.extend(staged)
                clean_path = display.split(" (renamed", 1)[0]
                if clean_path.endswith((".txt", ".rst", ".yaml")):
                    lint_paths.append(clean_path)

        if not applied:
            # Nothing to commit — clean up the branch and move on.
            run(["git", "checkout", "--detach", merge_sha])
            run(["git", "branch", "-D", branch])
            if conflict_files:
                print(f"  Conflicts only — no PR created for {label}.")
                result_rows.append((label, None, conflict_files))
            else:
                print(f"  Nothing to backport to {label} (all files skipped).")
            continue

        run(["git", "add", "--"] + stage_paths)

        if branch_existed and not has_staged_changes():
            # Branch already has this exact content (e.g. a re-trigger from
            # an unrelated label change) — nothing to commit, so leave the
            # existing branch/PR untouched rather than pushing a no-op.
            print(f"  No changes for {label} (branch already up to date).")
            run(["git", "checkout", "--detach", merge_sha])
            run(["git", "branch", "-D", branch])
            existing_pr_url = gh(
                [
                    "pr", "list",
                    "--repo", repo,
                    "--head", branch,
                    "--state", "open",
                    "--json", "url",
                    "--jq", ".[0].url",
                ]
            ).strip()
            if existing_pr_url:
                result_rows.append((label, existing_pr_url, conflict_files))
            continue

        # Commit and push. Starting from the branch's actual current tip
        # (whether freshly branched or fetched above) means this is always a
        # fast-forward, so no force-push is needed even on a re-trigger.
        run(
            [
                "git",
                "-c", "commit.gpgsign=false",
                "commit",
                "-m",
                f"Backport #{pr_number} to {label}: {pr_title}",
            ]
        )
        run(["git", "push", "-u", "origin", branch])

        # Build the per-version PR body.
        body_lines = [
            f"Backports the changes from #{pr_number} to `{label}`.",
            "",
            "## What was copied",
            "",
        ]
        for p in applied:
            body_lines.append(f"- `{p}`")
        body_lines.append("")

        if conflict_files:
            body_lines.extend([
                "## Conflicts – manual action required",
                "",
                "The following files had patch conflicts and were **not** "
                "automatically backported. Please apply them manually:",
                "",
            ])
            for cf in conflict_files:
                body_lines.append(f"- `{cf}`")
            body_lines.append("")

        if skipped:
            body_lines.extend([
                "## Skipped",
                "",
                "These files did not exist in the target version and were "
                "not backported. Review whether the new content should be "
                "added manually:",
                "",
            ])
            for s in skipped:
                body_lines.append(f"- {s}")
            body_lines.append("")

        body_lines.extend([
            "## Review",
            "",
            f"Original author: @{pr_author}",
            "",
            "Lint results (`./lint-docs.sh all`) will be posted as a comment "
            "once the workflow completes.",
        ])
        body = "\n".join(body_lines)

        # If a PR for this branch already exists (re-triggered by a later
        # label), the push above already updated it — don't create a
        # duplicate.
        existing_pr_url = gh(
            [
                "pr", "list",
                "--repo", repo,
                "--head", branch,
                "--state", "open",
                "--json", "url",
                "--jq", ".[0].url",
            ]
        ).strip()

        if existing_pr_url:
            pr_url = existing_pr_url
            print(f"  Updated existing backport PR: {pr_url}")
        else:
            create_args = [
                "pr", "create",
                "--repo", repo,
                "--base", base_ref,
                "--head", branch,
                "--title", f"Backport #{pr_number} to {label}: {pr_title}",
                "--body", body,
                "--draft",
            ]
            if assignee:
                create_args.extend(["--assignee", assignee])
            pr_url = gh(create_args).strip()
            print(f"  Opened backport PR: {pr_url}")

        new_pr_number = pr_url.rstrip("/").split("/")[-1]
        all_branches.append(branch)
        all_pr_numbers.append(new_pr_number)
        all_lint_paths.extend(lint_paths)
        result_rows.append((label, pr_url, conflict_files))

        # Return to detached HEAD at the merge commit so the next iteration
        # can branch cleanly from origin/base_ref.
        run(["git", "checkout", "--detach", merge_sha])

    # Post a results summary comment on the original PR.
    if result_rows:
        comment_lines = [
            "## Backport Results",
            "",
            "| Version | Status |",
            "| ------- | ------ |",
        ]
        manual_needed: list[str] = []
        for label, pr_url, conflict_files in result_rows:
            if pr_url:
                pr_num = pr_url.rstrip("/").split("/")[-1]
                if conflict_files:
                    status_cell = (
                        f"✅ [PR #{pr_num}]({pr_url}) "
                        f"(partial – {len(conflict_files)} file(s) had conflicts, "
                        f"manual action required)"
                    )
                    manual_needed.append(label)
                else:
                    status_cell = f"✅ [PR #{pr_num}]({pr_url})"
            else:
                status_cell = "❌ Conflicts – manual backport required"
                manual_needed.append(label)
            comment_lines.append(f"| `{label}` | {status_cell} |")

        if manual_needed and mention:
            comment_lines.extend([
                "",
                f"@{mention} The following version(s) could not be fully "
                f"backported due to conflicts. Please backport them manually:",
                "",
            ])
            for v in manual_needed:
                comment_lines.append(f"- `{v}`")

        post_comment(repo, pr_number, "\n".join(comment_lines))

    set_output("branches", " ".join(all_branches))
    set_output("pr_numbers", " ".join(all_pr_numbers))
    set_output("lint_files", " ".join(all_lint_paths))
    return 0


if __name__ == "__main__":
    sys.exit(main())
