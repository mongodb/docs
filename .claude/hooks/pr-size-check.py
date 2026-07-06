#!/usr/bin/env python3
"""
PR-size hook (Edit | Write), PreToolUse only.

Blocks edits that push hand-written content past a size tier until the user
approves. Tiers are based on DOCSP-60729's audit: reviews degrade past ~10
files/~300 lines and stall past ~20 files/~1,200 lines.

Before each Edit/Write the branch is sized including the pending change. If the
projected total crosses an unapproved tier, the edit is blocked. To approve, run:
    python3 .claude/hooks/pr-size-check.py --approve-tier [soft|hard]
Approval is stored in .git/pr-size-state.json (never committed).

Mechanical work (version flips, backports, redirects/TOC, platform, lockfiles,
code-example-tests) is exempt — sized on content lines only so mechanical diffs
don't inflate or mask reviewable content. Backport/version-cut branches are
skipped outright.
"""

import difflib
import json
import os
import re
import subprocess
import sys

# --- Thresholds (retune against the audit data) ------------------------------
SOFT_FILES, SOFT_LINES = 10, 300
HARD_FILES, HARD_LINES = 20, 1200

# New untracked files count toward size only if they are docs-source files, so
# a freshly-written page registers immediately without sweeping in un-gitignored
# build artifacts (which never have these extensions).
DOC_SOURCE_EXTS = (".txt", ".rst", ".yaml", ".yml")

# Build/cache directory segments. Untracked files anywhere under these are
# generated artifacts (e.g. from running code-example tests) and never counted,
# even if they happen to have a docs-source extension.
BUILD_DIR_SEGMENTS = {
    ".gradle", "build", "node_modules", "__pycache__", "dist", "target",
    ".venv", "venv", ".next", ".pytest_cache", ".mypy_cache", ".tox",
}

# --- Classification (ported from pr-size-audit/collect_pr_data.py) -----------
# Share of *changed lines* in mechanical paths above which a PR is mechanical.
MECH_LINE_THRESHOLD = 0.80

# Path categories that are generated/config/non-prose and therefore not the
# kind of content a writer reviews line-by-line.
MECHANICAL_CATEGORIES = {
    "toc", "redirects", "platform", "lockfile", "config", "code-examples",
}


def categorize_path(path):
    """Map a single changed file path to a category. 'content' is the default
    (hand-written docs prose: .txt/.rst and YAML extracts under source/)."""
    p = path.lower()
    segs = p.split("/")
    base = segs[-1]
    ext = "." + base.rsplit(".", 1)[-1] if "." in base else ""

    if base in ("package-lock.json", "pnpm-lock.yaml", "yarn.lock"):
        return "lockfile"
    if base == "netlify.toml":
        return "redirects"
    if p.startswith("platform/"):
        return "platform"
    # Deliberate divergence from the audit's collect_pr_data.py, which treats
    # code-example files as content: per project decision, code example work in
    # code-example-tests/ is mechanical and exempt from the size warning.
    if p.startswith("code-example-tests/"):
        return "code-examples"
    # Agent tooling/config (hooks, skills, settings under .claude/) -- not
    # reviewed docs prose, so PRs that are mostly this work are mechanical.
    if p.startswith(".claude/"):
        return "config"
    # TOC: the central folder, or any per-project "*-toc" directory segment
    if "table-of-contents" in segs or any(s.endswith("-toc") for s in segs):
        return "toc"
    # config/tooling: snooty.toml, other .toml, JS/TS project config, CI
    if base in ("snooty.toml", "package.json") or base.startswith("tsconfig") \
            or ext == ".toml" or p.startswith(".github/"):
        return "config"
    return "content"


def classify_pr(file_stats, subj):
    """Deterministically label a PR. file_stats is a list of
    (path, added, deleted). Returns one of:
    backport | version-cut | mechanical | content.

    Rules, in order:
      1. Backport      -> already reviewed on the source branch (title signal).
      2. Version cut   -> bulk directory duplication (title signal).
      3. >=80% of changed *lines* live in mechanical paths -> mechanical.
      4. Otherwise     -> content.
    A pure-rename/empty diff (0 changed lines) falls back to the same 80% test
    on the *count* of files.

    Note: only the title-signal verdicts (backport, version-cut) are stable for
    a branch and safe for the caller to cache. The >=80% path-ratio verdict is
    volatile (a PR can start 100% mechanical and drift below 80% as prose is
    added), so the caller recomputes it every edit and never caches it."""
    s = subj.lower()
    if "backport" in s or re.search(r"\(\d{4,6}\)\s*\(#\d+\)\s*$", subj):
        return "backport"
    if "flip" in s or ("version" in s and any(k in s for k in ("cut", "new version", "bump"))):
        return "version-cut"

    total = sum(a + d for _, a, d in file_stats)
    mech = sum(a + d for path, a, d in file_stats
               if categorize_path(path) in MECHANICAL_CATEGORIES)
    if total > 0:
        return "mechanical" if mech / total >= MECH_LINE_THRESHOLD else "content"
    # no line changes (renames / mode changes): fall back to file share
    if file_stats:
        mech_files = sum(1 for path, _, _ in file_stats
                         if categorize_path(path) in MECHANICAL_CATEGORIES)
        if mech_files / len(file_stats) >= MECH_LINE_THRESHOLD:
            return "mechanical"
    return "content"


def content_size(file_stats):
    """Files and changed lines of *hand-written* content only -- paths whose
    category is not mechanical. Mechanical churn (TOC/redirects/lockfiles/
    config/platform/code-examples) is excluded so the reviewable surface is
    measured on its own: a large content change is no longer masked when it
    rides alongside a bigger generated diff (which would push the whole PR over
    the >=80%-mechanical line and exempt it), nor is a small content change
    inflated by mechanical lines bundled with it."""
    cf = cl = 0
    for path, a, d in file_stats:
        if categorize_path(path) not in MECHANICAL_CATEGORIES:
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


def is_build_artifact(path):
    return any(seg in BUILD_DIR_SEGMENTS for seg in path.split("/"))


def new_doc_untracked_stats(cwd):
    """Count new (untracked) docs-source files so a freshly-written page
    registers before it is staged. Reads each file's line count directly rather
    than `git add -N`-ing it, so the user's index is never touched. Build
    artifacts and non-docs files are skipped."""
    out = git(["ls-files", "--others", "--exclude-standard"], cwd)
    stats = []
    for path in out.split("\n"):
        if not path:
            continue
        low = path.lower()
        if not low.endswith(DOC_SOURCE_EXTS) or is_build_artifact(low):
            continue
        try:
            with open(os.path.join(cwd, path), encoding="utf-8", errors="ignore") as f:
                added = sum(1 for _ in f)
        except OSError:
            continue
        stats.append((path, added, 0))
    return stats


def rel_to_repo(path, cwd):
    """Normalize a tool_input file_path to a repo-root-relative path matching the
    paths git emits. Returns None for paths outside the repo (which the size
    model does not track)."""
    if not path:
        return None
    rel = os.path.relpath(path, cwd) if os.path.isabs(path) else path
    rel = rel.replace(os.sep, "/")
    if rel.startswith("../"):
        return None
    return rel


def proposed_content(cwd, rel, tool_input):
    """The full text the edited file will hold once the pending tool call is
    applied. Write replaces the file wholesale; Edit substitutes new_string for
    old_string in the file's current working-tree content (all occurrences when
    replace_all is set, else the first). Returns None when the result cannot be
    determined (so the caller leaves sizing unchanged)."""
    tool = tool_input.get("_tool")
    if tool == "Write":
        return tool_input.get("content", "")
    if tool == "Edit":
        try:
            with open(os.path.join(cwd, rel), encoding="utf-8",
                      errors="ignore") as f:
                cur = f.read()
        except OSError:
            cur = ""
        old = tool_input.get("old_string", "")
        new = tool_input.get("new_string", "")
        if old == "":
            return cur
        return cur.replace(old, new) if tool_input.get("replace_all") \
            else cur.replace(old, new, 1)
    return None


def numstat_text(base_text, new_text):
    """Added/deleted line counts between two texts, matching `git diff --numstat`
    closely enough for tier sizing (line-based, headers excluded)."""
    a, b = base_text.splitlines(keepends=True), new_text.splitlines(keepends=True)
    added = deleted = 0
    for line in difflib.unified_diff(a, b, n=0):
        if line.startswith("+") and not line.startswith("+++"):
            added += 1
        elif line.startswith("-") and not line.startswith("---"):
            deleted += 1
    return added, deleted


def pending_file_stat(cwd, base, tool_input):
    """Project the (path, added, deleted) the *pending* (not-yet-applied) edit
    will produce vs the merge-base, so PreToolUse can size the branch as it will
    be once this write lands -- gating the very edit that crosses a tier rather
    than the next one. Returns None when projection is not possible."""
    rel = rel_to_repo(tool_input.get("file_path"), cwd)
    if rel is None:
        return None
    new_text = proposed_content(cwd, rel, tool_input)
    if new_text is None:
        return None
    base_text = git(["show", f"{base}:{rel}"], cwd) if base else ""
    added, deleted = numstat_text(base_text, new_text)
    return rel, added, deleted


def branch_diff_stats(cwd, pending=None):
    """Whole-branch diff vs the origin/main merge-base: committed branch changes,
    staged and unstaged edits to tracked files, and new untracked docs-source
    files.

    `git diff <merge-base>` compares the merge-base to the *working tree*, so a
    file that is both committed and further edited is counted once at its full
    size vs the base, not just its latest uncommitted delta. New pages are
    untracked until staged, so they are added separately (see
    new_doc_untracked_stats), limited to docs-source files outside build dirs so
    un-gitignored build artifacts cannot inflate the count.

    --no-renames is required: with rename detection on, numstat collapses a
    rename into a single `dir/{old => new}` path, which is not a real path and
    would defeat both categorize_path and the untracked-dedup `seen` set. With
    it off, a rename decomposes into a delete + add of clean paths.

    When `pending` is a tool_input dict (PreToolUse only), the edited file's
    entry is replaced with the size it *will* have once the pending edit is
    applied, so a single write that crosses a tier is gated before it lands.
    """
    base = git(["merge-base", find_diff_base(cwd), "HEAD"], cwd).strip()
    if not base:
        return []
    tracked = parse_numstat(git(["diff", "--numstat", "--no-renames", base], cwd))
    seen = {p for p, _, _ in tracked}
    untracked = [s for s in new_doc_untracked_stats(cwd) if s[0] not in seen]
    stats = tracked + untracked
    if pending is not None:
        proj = pending_file_stat(cwd, base, pending)
        if proj is not None:
            # Replace any existing entry for this file with the projection. A
            # projection that nets to zero changes vs base (e.g. an edit that
            # reverts the file, or an empty payload) drops the file rather than
            # adding a phantom 0-line entry that would inflate the file count.
            stats = [s for s in stats if s[0] != proj[0]]
            if proj[1] or proj[2]:
                stats.append(proj)
    return stats


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

# Block-gate reasons (PreToolUse "block"). Addressed to Claude: the write has
# been stopped; Claude must ask the user and run --approve-tier to unlock.
SOFT_ASK = (
    "PR SIZE GATE — SOFT LIMIT\n\n"
    "This branch now spans {files} files / {lines} changed lines of "
    "hand-written content, past the recommended PR size "
    "(~{sf} files / ~{sl} lines). Reviews start getting harder past this "
    "point. This edit has been blocked.\n\n"
    "Stop and tell the user the PR has reached the soft size limit. Ask "
    "whether they want to:\n"
    "  1. Authorize this size and continue — if yes, run:\n"
    "       python3 .claude/hooks/pr-size-check.py --approve-tier soft\n"
    "     then retry the blocked edit.\n"
    "  2. Wrap up the current scope as its own PR before continuing.\n\n"
    "Do NOT retry the write until the user explicitly chooses option 1."
)

HARD_ASK = (
    "PR SIZE GATE — HARD LIMIT\n\n"
    "This branch now spans {files} files / {lines} changed lines of "
    "hand-written content, past the size where reviewers disengage and review "
    "coverage is lost (~{hf} files / ~{hl} lines). This edit has been "
    "blocked.\n\n"
    "Stop and tell the user the PR has reached the hard size limit. Ask "
    "whether they want to:\n"
    "  1. Authorize this large PR — if yes, run:\n"
    "       python3 .claude/hooks/pr-size-check.py --approve-tier hard\n"
    "     then retry the blocked edit.\n"
    "  2. Split this into separate, independently reviewable PRs.\n\n"
    "Do NOT retry the write until the user explicitly chooses option 1."
)


def block(message):
    """Block the pending edit and surface the message to Claude. Claude must
    then ask the user for authorization; if granted, Claude runs
    --approve-tier to unlock the gate before retrying. Emitting nothing
    leaves the edit allowed."""
    json.dump({"decision": "block", "reason": message}, sys.stdout)


def report(cwd):
    """Human-readable, read-only size report for the current branch. Used by
    the open-pr skill as a final size gate at PR-creation time. Does not touch
    the per-branch state or emit a hook payload."""
    if not git(["rev-parse", "--verify", "--quiet", "origin/main"], cwd).strip():
        print("PR SIZE: cannot determine (no origin/main to diff against).")
        return
    diff_base = find_diff_base(cwd)
    file_stats = branch_diff_stats(cwd)
    total_files = len(file_stats)
    total_lines = sum(a + d for _, a, d in file_stats)
    files, lines = content_size(file_stats)
    subjects = git(["log", f"{diff_base}..HEAD", "--pretty=%s"], cwd)
    change_type = classify_pr(file_stats, (current_branch(cwd) or "") + "\n" + subjects)
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


def evaluate(cwd, pending=None):
    """Size the branch. `pending` is the tool_input of the not-yet-applied edit;
    when given, the branch is sized as it will be once that edit lands, so the
    gate fires on the crossing edit itself. Returns
    (state_path, state, branch, entry, tier, files, lines), or None to bail out
    (main/detached HEAD, no origin/main, no git dir, mechanically locked, or no
    diff). Backport/version-cut branches are locked here on first sight so the
    caller never has to re-classify them.

    'entry' is the mutable per-branch state record; callers mutate it and call
    save_state. New fields default lazily via .get so pre-existing state files
    (written before those fields existed) keep working."""
    branch = current_branch(cwd)
    # Don't act on main/detached HEAD, or when there's no origin/main to diff.
    if not branch or branch in ("main", "HEAD"):
        return None
    if not git(["rev-parse", "--verify", "--quiet", "origin/main"], cwd).strip():
        return None

    gdir = git_dir(cwd)
    if not gdir:
        return None
    state_path = os.path.join(gdir, "pr-size-state.json")
    state = load_state(state_path)
    entry = state.get(branch, {"locked_mechanical": False,
                               "approved_tier": "none",
                               "pending_ask_tier": "none"})

    # Stable mechanical lock (title/branch signal): skip forever.
    if entry.get("locked_mechanical"):
        return None

    file_stats = branch_diff_stats(cwd, pending)
    if not file_stats:
        return None

    # Subject signal for backport/version-cut detection: there is no PR title
    # mid-session, so use the branch name plus the branch's commit subjects.
    diff_base = find_diff_base(cwd)
    subjects = git(["log", f"{diff_base}..HEAD", "--pretty=%s"], cwd)
    subject = branch + "\n" + subjects

    change_type = classify_pr(file_stats, subject)
    if change_type in ("backport", "version-cut"):
        # Stable title signal: already-reviewed or bulk duplication. Cache and
        # never check this branch again.
        entry["locked_mechanical"] = True
        state[branch] = entry
        save_state(state_path, state)
        return None

    # Size on hand-written content only. A purely mechanical PR has ~0 content
    # lines and so never trips a tier; a content change is measured on its own
    # whether or not mechanical churn rides alongside it. Always recomputed (we
    # never cache a below-tier verdict), so no volatility concern.
    files, lines = content_size(file_stats)
    tier = tier_of(files, lines)
    return state_path, state, branch, entry, tier, files, lines


def gate(cwd, tool_input):
    """PreToolUse: block any edit that would push the branch's hand-written
    content into a tier the user has not yet approved. Sizes the branch
    *including the pending edit* so the crossing edit itself is blocked, not
    the next one. Emits nothing -- leaving the edit allowed -- when the content
    is already within an approved tier.

    When a block fires, Claude must ask the user for authorization. If they
    agree, Claude runs:
        python3 .claude/hooks/pr-size-check.py --approve-tier [soft|hard]
    which records approval in the per-branch state, then retries the edit."""
    res = evaluate(cwd, pending=tool_input)
    if not res:
        return
    state_path, state, branch, entry, tier, files, lines = res

    approved = entry.get("approved_tier", "none")
    if TIER_RANK[tier] <= TIER_RANK[approved]:
        return

    if tier == "hard":
        block(HARD_ASK.format(files=files, lines=lines,
                              hf=HARD_FILES, hl=HARD_LINES))
    elif tier == "soft":
        block(SOFT_ASK.format(files=files, lines=lines,
                              sf=SOFT_FILES, sl=SOFT_LINES))


def approve(cwd, tier):
    """Record explicit user authorization for the given size tier on the
    current branch. Called by Claude (via Bash) after getting user consent,
    before retrying a blocked write. Idempotent: re-approving the same or a
    lower tier is a no-op."""
    if tier not in ("soft", "hard"):
        print(f"Unknown tier '{tier}'. Use: soft or hard", file=sys.stderr)
        sys.exit(1)
    branch = current_branch(cwd)
    if not branch or branch in ("main", "HEAD"):
        print("Not on a feature branch; nothing to approve.", file=sys.stderr)
        return
    gdir = git_dir(cwd)
    if not gdir:
        print("No git directory found.", file=sys.stderr)
        return
    state_path = os.path.join(gdir, "pr-size-state.json")
    state = load_state(state_path)
    entry = state.get(branch, {"locked_mechanical": False,
                               "approved_tier": "none"})
    if TIER_RANK[tier] > TIER_RANK[entry.get("approved_tier", "none")]:
        entry["approved_tier"] = tier
        state[branch] = entry
        save_state(state_path, state)
        print(f"PR size tier '{tier}' approved for branch '{branch}'. "
              "Retry the blocked write.")
    else:
        print(f"Tier '{tier}' already approved for branch '{branch}'. "
              "Retry the blocked write.")


def main():
    cwd = os.environ.get("CLAUDE_PROJECT_DIR") or os.getcwd()
    if "--report" in sys.argv[1:]:
        report(cwd)
        return
    if "--approve-tier" in sys.argv[1:]:
        idx = sys.argv.index("--approve-tier")
        tier = sys.argv[idx + 1] if idx + 1 < len(sys.argv) else ""
        approve(cwd, tier)
        return

    try:
        payload = json.load(sys.stdin)
    except Exception:
        return
    tool_name = payload.get("tool_name")
    if tool_name not in ("Edit", "Write"):
        return

    cwd = payload.get("cwd") or cwd
    # Carry the tool name alongside its input so the projection knows whether
    # to treat content as a whole-file write or a string substitution.
    tool_input = dict(payload.get("tool_input") or {})
    tool_input["_tool"] = tool_name
    gate(cwd, tool_input)


if __name__ == "__main__":
    main()
