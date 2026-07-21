#!/usr/bin/env python3
"""
PR-size hook (Bash / git push), PreToolUse only.

Blocks a push when the branch's hand-written content has grown past a
review-size tier, until the user authorizes that size. Tiers are based on
DOCSP-60729's audit: reviews degrade past ~10 files/~300 lines and stall past
~20 files/~1,200 lines.

The hook fires *before* `git push`. At push time everything that will land on
the PR is already committed, so the branch is sized on committed history vs the
origin/main merge-base -- the exact diff the reviewer sees on the PR. No
staged/unstaged/untracked churn and no simulated pending edits are involved, so
the count matches GitHub's own "Files changed" math.

Stale-ref accuracy: origin/main is a local cached ref that only moves on
fetch/pull/push. If it lags real main, a branch that has merged newer main into
it is sized against too-old a base and the diff is inflated with commits that
aren't the writer's -- the classic over-flag. To prevent that, the hook does a
best-effort `git fetch origin main` before sizing (short timeout, credential
prompts disabled, so it can never hang or block the push). If the fetch fails
(offline/no remote), it falls back to the cached ref and notes in the block
message that the size may be inflated.

To authorize a blocked size and let the push through, run:
    python3 .claude/hooks/pr-size-check.py --approve-tier [soft|hard]
Approval is stored per-branch in .git/pr-size-state.json (never committed) and
escalates: approving soft still gates if the branch later crosses hard.

Mechanical work is excluded from the count entirely: anything outside content/,
any snooty.toml or netlify.toml, the central content/table-of-contents/ folder,
and any per-project "*-toc" directory. Backport and version-cut branches, and
any branch under feature/, are skipped outright.

The open-pr skill calls `--report` for a read-only size summary at PR time.
"""

import json
import os
import re
import subprocess
import sys

# --- Thresholds (retune against the audit data) ------------------------------
SOFT_FILES, SOFT_LINES = 10, 300
HARD_FILES, HARD_LINES = 20, 1200

# Best-effort fetch budget. A push is already an online operation, so a few
# seconds to refresh origin/main is cheap; the timeout guarantees the hook can
# never hang the push if the network is slow or unavailable.
FETCH_TIMEOUT = 8


def is_mechanical(path):
    """True if a changed file is mechanical churn excluded from the size count.

    Counted (reviewable) files are hand-written docs content: paths under
    content/ that are not TOC files and not per-project config. Everything
    else is mechanical:
      - anything outside content/ (platform, .claude, code-example-tests,
        .github, lockfiles, etc.)
      - any snooty.toml or netlify.toml, wherever it lives
      - the central content/table-of-contents/ folder
      - any directory segment ending in "-toc" (per-project TOC folders)
    """
    p = path.lower()
    segs = p.split("/")
    if segs[-1] in ("snooty.toml", "netlify.toml"):
        return True
    if not p.startswith("content/"):
        return True
    if p.startswith("content/table-of-contents/"):
        return True
    return any(s.endswith("-toc") for s in segs)


def classify_pr(subj):
    """Deterministically label a PR from its title/subject signal. Returns one
    of: backport | version-cut | content.

    Rules, in order:
      1. Backport    -> already reviewed on the source branch (title signal).
      2. Version cut -> bulk directory duplication (title signal).
      3. Otherwise   -> content.

    Per-file mechanical churn is excluded from the size itself by is_mechanical
    (see content_size), so no line-share threshold is needed here: this only
    identifies the two branch kinds that are exempt from the size gate outright.
    """
    s = subj.lower()
    if "backport" in s or re.search(r"\(\d{4,6}\)\s*\(#\d+\)\s*$", subj):
        return "backport"
    if "flip" in s or ("version" in s and any(k in s for k in ("cut", "new version", "bump"))):
        return "version-cut"
    return "content"


def content_size(file_stats):
    """Files and changed lines of *hand-written* content only -- paths that are
    not mechanical (see is_mechanical). Mechanical churn is excluded so the
    reviewable surface is measured on its own: a large content change is not
    masked when it rides alongside a bigger generated diff, nor is a small
    content change inflated by mechanical lines bundled with it."""
    cf = cl = 0
    for path, a, d in file_stats:
        if not is_mechanical(path):
            cf += 1
            cl += a + d
    return cf, cl


# --- git plumbing ------------------------------------------------------------
def git(args, cwd):
    try:
        return subprocess.run(["git", *args], capture_output=True, text=True,
                              cwd=cwd, check=False).stdout
    except Exception:
        return ""


def refresh_main(cwd):
    """Best-effort refresh of the origin/main remote-tracking ref so the branch
    is sized against real current main, not a stale cached snapshot. Returns
    True if the fetch succeeded.

    This is a fetch, never a pull: it only moves the origin/main bookmark and
    downloads new objects. It does not touch the working tree, the current
    branch, or any checked-out files, so it is safe to run from any branch mid
    session. GIT_TERMINAL_PROMPT=0 stops git from blocking on a credential
    prompt, and the timeout guarantees the push is never held up."""
    env = dict(os.environ, GIT_TERMINAL_PROMPT="0")
    try:
        r = subprocess.run(["git", "fetch", "origin", "main"], cwd=cwd,
                           env=env, capture_output=True, text=True,
                           timeout=FETCH_TIMEOUT, check=False)
        return r.returncode == 0
    except Exception:
        return False


def find_diff_base(cwd):
    """Return the most appropriate diff base for PR sizing.

    For branches that track a non-main upstream (i.e., sub-branches of a
    feature branch), diff against that upstream instead of origin/main so
    only the changes unique to this branch are counted, not all accumulated
    changes on the parent feature branch.
    """
    upstream = git(
        ["rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{u}"], cwd
    ).strip()
    if upstream and upstream not in ("", "origin/main", "origin/HEAD"):
        if git(["rev-parse", "--verify", "--quiet", upstream], cwd).strip():
            return upstream
    return "origin/main"


def git_dir(cwd):
    out = git(["rev-parse", "--git-dir"], cwd).strip()
    if not out:
        return None
    return out if os.path.isabs(out) else os.path.join(cwd, out)


def current_branch(cwd):
    return git(["rev-parse", "--abbrev-ref", "HEAD"], cwd).strip()


def parse_numstat(text):
    """Return a list of (path, added, deleted). Binary files show '-' counts,
    which we treat as 0 changed lines (their churn is not line-reviewable)."""
    stats = []
    for line in text.splitlines():
        cols = line.split("\t")
        if len(cols) != 3:
            continue
        a = int(cols[0]) if cols[0].isdigit() else 0
        d = int(cols[1]) if cols[1].isdigit() else 0
        stats.append((cols[2], a, d))
    return stats


def branch_diff_stats(cwd):
    """Committed diff of every commit on the branch vs the origin/main
    merge-base -- exactly the work that will land on the PR. Staged, unstaged,
    and untracked changes are deliberately excluded: the hook fires before a
    push, so everything that will land is already committed, and this measures
    committed history only.

    --no-renames is required: with rename detection on, numstat collapses a
    rename into a single `dir/{old => new}` path, which is not a real path and
    would defeat is_mechanical. With it off, a rename decomposes into a delete
    plus an add of clean paths.
    """
    base = git(["merge-base", find_diff_base(cwd), "HEAD"], cwd).strip()
    if not base:
        return []
    return parse_numstat(
        git(["diff", "--numstat", "--no-renames", base, "HEAD"], cwd))


# --- per-branch state (.git/pr-size-state.json, never committed) -------------
def load_state(state_path):
    try:
        with open(state_path) as f:
            return json.load(f)
    except Exception:
        return {}


def save_state(state_path, state):
    try:
        with open(state_path, "w") as f:
            json.dump(state, f)
    except Exception:
        pass


def tier_of(files, lines):
    if files >= HARD_FILES or lines >= HARD_LINES:
        return "hard"
    if files >= SOFT_FILES or lines >= SOFT_LINES:
        return "soft"
    return "none"


TIER_RANK = {"none": 0, "soft": 1, "hard": 2}

# Stale-ref caveat appended to a block message when the pre-size fetch failed,
# so the writer knows an offline/failed refresh may have inflated the count.
STALE_NOTE = (
    "\n\nNOTE: could not refresh origin/main before sizing (offline or fetch "
    "failed), so this count may be inflated if main has advanced since your "
    "last fetch. Run `git fetch origin main` and push again to re-check before "
    "authorizing."
)

# Block-gate reasons (PreToolUse "block"). Addressed to Claude: the push has
# been stopped; Claude must ask the user and run --approve-tier to unlock.
SOFT_ASK = (
    "PR SIZE GATE — SOFT LIMIT\n\n"
    "This branch spans {files} files / {lines} changed lines of hand-written "
    "content, past the recommended PR size (~{sf} files / ~{sl} lines). "
    "Reviews start getting harder past this point. This push has been "
    "blocked.\n\n"
    "Stop and tell the user the PR has reached the soft size limit. Ask "
    "whether they want to:\n"
    "  1. Authorize this size and push anyway — if yes, run:\n"
    "       python3 .claude/hooks/pr-size-check.py --approve-tier soft\n"
    "     then retry the push.\n"
    "  2. Wrap up the current scope as its own PR before adding more.\n\n"
    "Do NOT retry the push until the user explicitly chooses option 1."
)

HARD_ASK = (
    "PR SIZE GATE — HARD LIMIT\n\n"
    "This branch spans {files} files / {lines} changed lines of hand-written "
    "content, past the size where reviewers disengage and review coverage is "
    "lost (~{hf} files / ~{hl} lines). This push has been blocked.\n\n"
    "Stop and tell the user the PR has reached the hard size limit. Ask "
    "whether they want to:\n"
    "  1. Authorize this large PR and push anyway — if yes, run:\n"
    "       python3 .claude/hooks/pr-size-check.py --approve-tier hard\n"
    "     then retry the push.\n"
    "  2. Split this into separate, independently reviewable PRs.\n\n"
    "Do NOT retry the push until the user explicitly chooses option 1."
)


def block(message):
    """Block the pending push and surface the message to Claude. Claude must
    then ask the user for authorization; if granted, Claude runs --approve-tier
    to unlock the gate before retrying. Emitting nothing leaves the push
    allowed."""
    json.dump({"decision": "block", "reason": message}, sys.stdout)


def report(cwd):
    """Human-readable, read-only size report for the current branch. Used by
    the open-pr skill as a size summary at PR-creation time. Refreshes
    origin/main first so the numbers match the PR, but does not touch the
    per-branch state or emit a hook payload."""
    refresh_main(cwd)
    if not git(["rev-parse", "--verify", "--quiet", "origin/main"], cwd).strip():
        print("PR SIZE: cannot determine (no origin/main to diff against).")
        return
    diff_base = find_diff_base(cwd)
    file_stats = branch_diff_stats(cwd)
    total_files = len(file_stats)
    total_lines = sum(a + d for _, a, d in file_stats)
    files, lines = content_size(file_stats)
    subjects = git(["log", f"{diff_base}..HEAD", "--pretty=%s"], cwd)
    change_type = classify_pr((current_branch(cwd) or "") + "\n" + subjects)
    print(f"PR SIZE: {total_files} files, {total_lines} changed lines vs "
          f"{diff_base} ({files} files / {lines} lines hand-written content); "
          f"classified: {change_type}.")
    if change_type in ("backport", "version-cut"):
        print(f"VERDICT: exempt — {change_type} changes are not subject to the "
              "review-size limits.")
        return
    tier = tier_of(files, lines)
    if tier == "hard":
        print(f"VERDICT: EXCEEDS the hard review-coverage limit "
              f"(~{HARD_FILES} files / ~{HARD_LINES} lines). Reviewers tend to "
              "disengage at this size. Strongly recommend splitting into "
              "separate, independently reviewable PRs.")
    elif tier == "soft":
        print(f"VERDICT: large — past the point where reviews get harder "
              f"(~{SOFT_FILES} files / ~{SOFT_LINES} lines). Consider splitting "
              "into smaller PRs.")
    elif total_lines > lines:
        print(f"VERDICT: within the recommended size — its hand-written content "
              f"is under ~{SOFT_FILES} files / ~{SOFT_LINES} lines (mechanical "
              "churn excluded).")
    else:
        print(f"VERDICT: within the recommended size (under ~{SOFT_FILES} files "
              f"/ ~{SOFT_LINES} lines).")


def evaluate(cwd):
    """Size the current branch's committed content. Returns
    (state_path, state, branch, entry, tier, files, lines), or None to bail out
    (main/detached HEAD, feature/* branch, no origin/main, no git dir,
    backport/version-cut branch, or no diff). Backport/version-cut branches are
    locked here on first sight so the branch is never re-classified.

    'entry' is the mutable per-branch state record; the caller mutates it and
    calls save_state. New fields default lazily via .get so pre-existing state
    files keep working."""
    branch = current_branch(cwd)
    # Don't act on main/detached HEAD, feature branches (an accepted
    # exception -- always much larger than a normal PR), or when there's no
    # origin/main to diff against.
    if not branch or branch in ("main", "HEAD"):
        return None
    if branch.startswith("feature/"):
        return None
    if not git(["rev-parse", "--verify", "--quiet", "origin/main"], cwd).strip():
        return None

    gdir = git_dir(cwd)
    if not gdir:
        return None
    state_path = os.path.join(gdir, "pr-size-state.json")
    state = load_state(state_path)
    entry = state.get(branch, {"locked_mechanical": False,
                               "approved_tier": "none"})

    # Stable mechanical lock (title/branch signal): skip forever.
    if entry.get("locked_mechanical"):
        return None

    file_stats = branch_diff_stats(cwd)
    if not file_stats:
        return None

    # Subject signal for backport/version-cut detection: there is no PR title
    # mid-session, so use the branch name plus the branch's commit subjects.
    diff_base = find_diff_base(cwd)
    subjects = git(["log", f"{diff_base}..HEAD", "--pretty=%s"], cwd)
    subject = branch + "\n" + subjects

    change_type = classify_pr(subject)
    if change_type in ("backport", "version-cut"):
        # Stable title signal: already-reviewed or bulk duplication. Cache and
        # never check this branch again.
        entry["locked_mechanical"] = True
        state[branch] = entry
        save_state(state_path, state)
        return None

    # Size on hand-written content only. Mechanical churn never trips a tier.
    files, lines = content_size(file_stats)
    tier = tier_of(files, lines)
    return state_path, state, branch, entry, tier, files, lines


def gate(cwd, fetched):
    """PreToolUse (git push): if the branch's hand-written content is in a tier
    the user has not authorized, block the push and tell Claude to ask. Once
    the user authorizes a tier via --approve-tier, that tier (and lower) pass;
    crossing into a higher tier gates again. Advisory limits, hard gate."""
    res = evaluate(cwd)
    if not res:
        return
    _, _, _, entry, tier, files, lines = res

    if tier == "none":
        return
    approved = entry.get("approved_tier", "none")
    if TIER_RANK[tier] <= TIER_RANK[approved]:
        return

    note = "" if fetched else STALE_NOTE
    if tier == "hard":
        block(HARD_ASK.format(files=files, lines=lines,
                              hf=HARD_FILES, hl=HARD_LINES) + note)
    elif tier == "soft":
        block(SOFT_ASK.format(files=files, lines=lines,
                              sf=SOFT_FILES, sl=SOFT_LINES) + note)


def approve_tier(cwd, tier):
    """Record user authorization for the given tier on the current branch, so
    subsequent pushes at that size (or smaller) are not blocked. Escalating:
    approving 'hard' also covers 'soft'; approving 'soft' still gates 'hard'."""
    if tier not in ("soft", "hard"):
        print("usage: --approve-tier [soft|hard]")
        return
    branch = current_branch(cwd)
    if not branch or branch in ("main", "HEAD"):
        print("Not on a feature branch; nothing to approve.")
        return
    gdir = git_dir(cwd)
    if not gdir:
        print("No git dir found; cannot record approval.")
        return
    state_path = os.path.join(gdir, "pr-size-state.json")
    state = load_state(state_path)
    entry = state.get(branch, {"locked_mechanical": False,
                               "approved_tier": "none"})
    current = entry.get("approved_tier", "none")
    # Never downgrade an existing approval.
    if TIER_RANK[tier] > TIER_RANK[current]:
        entry["approved_tier"] = tier
    state[branch] = entry
    save_state(state_path, state)
    print(f"Approved '{entry['approved_tier']}' PR size for branch "
          f"'{branch}'. Retry the push.")


def main():
    cwd = os.environ.get("CLAUDE_PROJECT_DIR") or os.getcwd()
    args = sys.argv[1:]
    if "--report" in args:
        report(cwd)
        return
    if "--approve-tier" in args:
        i = args.index("--approve-tier")
        tier = args[i + 1] if i + 1 < len(args) else ""
        approve_tier(cwd, tier)
        return

    try:
        payload = json.load(sys.stdin)
    except Exception:
        return
    if payload.get("tool_name") != "Bash":
        return
    cmd = (payload.get("tool_input") or {}).get("command", "")
    # Act only on git push (PreToolUse: everything that will land is committed,
    # so HEAD is the full PR). Matches `git push ...` anywhere in a compound
    # command (e.g. `git add -A && git commit -m x && git push`).
    if not re.search(r"\bgit\s+push\b", cmd):
        return

    cwd = payload.get("cwd") or cwd
    # Refresh origin/main before sizing so a stale cached ref cannot inflate
    # the count. Best-effort: falls back to the cached ref if it fails.
    fetched = refresh_main(cwd)
    gate(cwd, fetched)


if __name__ == "__main__":
    main()
