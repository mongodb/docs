#!/usr/bin/env bash
# Entry script for the local-build-check skill.
# Orchestrates the Snooty RST parser against any content/ projects with
# pending changes. Writes structured output to a log file whose path is
# printed on exit.
#
# Usage:
#   check.sh                              # run on changed projects
#   check.sh --project <name>             # force a specific project
#   check.sh --refresh-snooty            # delete cached venv/clone before running
#   check.sh --check-env                  # only verify environment

set -uo pipefail

TS=$(date +%Y%m%d-%H%M%S)
LOG=/tmp/local-build-check-${TS}.log
rm -f /tmp/lbc-latest.log   # remove stale symlink from previous run immediately

REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null) || {
  echo "[check] not in a git repository" >&2
  exit 2
}
# Cache lives outside the skill directory so the skill-validator doesn't count
# the snooty-parser clone and venv as skill content.
SNOOTY_TOOLS="${HOME}/.cache/docs-mongodb-internal/local-build-check"
mkdir -p "$SNOOTY_TOOLS"

CHECK_ENV_ONLY=0
REFRESH_SNOOTY=0
FORCED_PROJECT=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --check-env)       CHECK_ENV_ONLY=1; shift ;;
    --refresh-snooty)  REFRESH_SNOOTY=1; shift ;;
    --project)         FORCED_PROJECT="$2"; shift 2 ;;
    *)                 echo "[check] unknown arg: $1" >&2; exit 2 ;;
  esac
done

log() { printf '[check] %s\n' "$*" | tee -a "$LOG"; }
log_raw() { printf '%s\n' "$*" >> "$LOG"; }

check_env() {
  log "env ok: node=$(node -v 2>/dev/null || echo n/a)"
  return 0
}

if [[ $CHECK_ENV_ONLY -eq 1 ]]; then
  check_env
  rc=$?
  echo "$LOG"
  exit $rc
fi

check_env || exit $?

detect_projects() {
  if [[ -n "$FORCED_PROJECT" ]]; then
    echo "$FORCED_PROJECT"
    return
  fi
  {
    git -C "$REPO_ROOT" diff --name-only origin/main...HEAD -- 'content/**' 2>/dev/null || true
    git -C "$REPO_ROOT" diff --name-only HEAD -- 'content/**' 2>/dev/null || true
    git -C "$REPO_ROOT" ls-files --others --exclude-standard 'content/**' 2>/dev/null || true
  } | awk -F/ '$1=="content" && $2!="" {print $2}' | sort -u
}

find_snooty_root() {
  # Walk up from a changed file's directory to find the nearest snooty.toml.
  # Prints the containing directory, or returns 1 if not found.
  local file_path="${REPO_ROOT}/$1"
  local dir
  dir=$(dirname "$file_path")
  while [[ "$dir" != "$REPO_ROOT" && "$dir" != "/" ]]; do
    if [[ -f "${dir}/snooty.toml" ]]; then
      echo "$dir"
      return 0
    fi
    dir=$(dirname "$dir")
  done
  return 1
}

get_changed_relative_paths() {
  # Returns changed file paths relative to the snooty source root (source/).
  # Snooty diagnostic paths are relative to source/, so this lets us match
  # diagnostics to the files that introduced them.
  local project="$1"
  local snooty_root="$2"
  local source_root="${snooty_root}/source"
  {
    git -C "$REPO_ROOT" diff --name-only origin/main...HEAD -- "content/${project}/**" 2>/dev/null || true
    git -C "$REPO_ROOT" diff --name-only HEAD -- "content/${project}/**" 2>/dev/null || true
    git -C "$REPO_ROOT" ls-files --others --exclude-standard "content/${project}/**" 2>/dev/null || true
  } | sort -u | while IFS= read -r f; do
    local abs="${REPO_ROOT}/${f}"
    if [[ "$abs" == "${source_root}/"* ]]; then
      echo "${abs#${source_root}/}"
    fi
  done | sort -u
}

find_snooty_roots_for_project() {
  local project="$1"
  {
    git -C "$REPO_ROOT" diff --name-only origin/main...HEAD -- "content/${project}/**" 2>/dev/null || true
    git -C "$REPO_ROOT" diff --name-only HEAD -- "content/${project}/**" 2>/dev/null || true
    git -C "$REPO_ROOT" ls-files --others --exclude-standard "content/${project}/**" 2>/dev/null || true
  } | sort -u | while IFS= read -r f; do
    [[ -z "$f" ]] && continue
    find_snooty_root "$f" 2>/dev/null || true
  done | sort -u

  # Fallback for forced project with no staged changes: use snooty.toml at
  # content/<project>/ directly.
  if [[ -n "$FORCED_PROJECT" ]]; then
    [[ -f "${REPO_ROOT}/content/${project}/snooty.toml" ]] && \
      echo "${REPO_ROOT}/content/${project}"
  fi
}

run_snooty() {
  local project="$1"
  local snooty_root="$2"
  local diag_log="/tmp/snooty-diagnostics-${project}-${TS}.log"
  local changed_paths="/tmp/snooty-changed-${project}-${TS}.txt"

  if [[ $REFRESH_SNOOTY -eq 1 ]]; then
    log "[snooty] --refresh-snooty: removing cached venv and clone"
    rm -rf "${SNOOTY_TOOLS}/.venv" "${SNOOTY_TOOLS}/snooty-parser"
  fi

  log "[snooty] setting up environment for $project ($snooty_root)"
  log_raw "===== BEGIN snooty-setup $project ====="
  (
    set -e
    cd "$SNOOTY_TOOLS"

    if ! command -v uv &>/dev/null; then
      echo "Installing uv..."
      curl -LsSf https://astral.sh/uv/install.sh | sh
      export PATH="$HOME/.local/bin:$PATH"
    fi

    if [[ ! -d ".venv" ]]; then
      uv venv --python 3.12 .venv
    fi

    source .venv/bin/activate

    # Skip clone+install if the snooty binary is present AND the editable
    # install's source directory is intact. The source dir check catches the
    # case where snooty-parser/ was deleted after an editable install: the
    # binary exists but the .pth-linked package is gone, causing an import
    # crash at runtime. Use --refresh-snooty to force a full reinstall.
    if [[ ! -f ".venv/bin/snooty" ]] || [[ ! -d "snooty-parser/snooty" ]]; then
      if [[ ! -d "snooty-parser" ]]; then
        git clone https://github.com/mongodb/snooty-parser.git
      fi
      cd snooty-parser
      uv pip install flit wheel typing_extensions
      uv pip install -e .
    fi
  ) >>"$LOG" 2>&1
  local setup_rc=$?
  log_raw "===== END snooty-setup $project (rc=$setup_rc) ====="

  if [[ $setup_rc -ne 0 ]]; then
    log "[snooty] setup FAILED (rc=$setup_rc)"
    OVERALL_RC=1
    return 1
  fi

  # Collect changed paths relative to snooty source root for diff-filtering
  get_changed_relative_paths "$project" "$snooty_root" > "$changed_paths"

  # Check if any changed file contains a .. toctree:: directive.
  # Used to promote "Page not included in any toctree" warnings in unchanged
  # files: when the user edits a toctree file, detached-page warnings are a
  # downstream effect of that change, not pre-existing noise.
  local toctree_changed_file="/tmp/snooty-toctree-changed-${project}-${TS}.txt"
  local source_root="${snooty_root}/source"
  while IFS= read -r rel_path; do
    local abs="${source_root}/${rel_path}"
    if [[ -f "$abs" ]] && grep -qE '^\.\. toctree::' "$abs" 2>/dev/null; then
      echo "$rel_path" >> "$toctree_changed_file"
    fi
  done < "$changed_paths"
  [[ -f "$toctree_changed_file" ]] || touch "$toctree_changed_file"

  # Collect RST label names touched by the diff (added or removed lines
  # containing ".. _label-name:"). Used to promote "Target not found" errors
  # in unchanged files that reference a label defined/broken in the diff.
  local affected_labels_file="/tmp/snooty-affected-labels-${project}-${TS}.txt"
  {
    git -C "$REPO_ROOT" diff origin/main...HEAD -- "content/${project}/**" 2>/dev/null || true
    git -C "$REPO_ROOT" diff HEAD -- "content/${project}/**" 2>/dev/null || true
  } | grep '^[+-]' \
    | sed -nE 's/^[+-].*\.\. _([a-zA-Z0-9][a-zA-Z0-9_-]*):.*/\1/p' \
    | sort -u > "$affected_labels_file"

  local snooty_bin="${SNOOTY_TOOLS}/.venv/bin/snooty"
  local python="${SNOOTY_TOOLS}/.venv/bin/python3"

  log "[snooty] building $snooty_root"
  log_raw "===== BEGIN snooty-build $project ====="
  DIAGNOSTICS_FORMAT=JSON "$snooty_bin" build "$snooty_root" \
    >"$diag_log" 2>>"$LOG"
  local build_rc=$?
  log_raw "===== END snooty-build $project (rc=$build_rc) ====="

  # Detect a parser crash: non-zero exit with no JSON diagnostics written.
  # Snooty can crash mid-postprocess (e.g. KeyError on malformed directive
  # options) before emitting any JSON, producing a false-clean result if we
  # only check diagnostic counts. Treat this as a blocking introduced error.
  if [[ $build_rc -ne 0 && ! -s "$diag_log" ]]; then
    log "[snooty] CRASH: parser exited $build_rc with no diagnostics written"
    log_raw "INTRO	ERROR	${project}	?	Snooty crashed (rc=$build_rc) — no JSON diagnostics produced. Check stderr above for the traceback."
    OVERALL_RC=1
    return 1
  fi

  # Categorize diagnostics: introduced by diff vs pre-existing.
  # A diagnostic is INTRO if:
  #   (a) it is in a changed file, OR
  #   (b) it is a "Target not found" error whose target name was touched
  #       by the diff (label defined or modified in a changed file), OR
  #   (c) it is a "Page not included in any toctree" warning and a changed
  #       file contains a .. toctree:: directive (page detached by toctree edit).
  local categorized
  categorized=$("$python" - "$diag_log" "$changed_paths" "$affected_labels_file" "$toctree_changed_file" <<'PYEOF'
import sys, json, re
diag_log, changed_file, labels_file, toctree_file = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
with open(changed_file) as f:
    changed = {l.strip() for l in f if l.strip()}
with open(labels_file) as f:
    affected_labels = {l.strip() for l in f if l.strip()}
with open(toctree_file) as f:
    toctree_changed = {l.strip() for l in f if l.strip()}
counts = {'INTRO': {'ERROR': 0, 'WARNING': 0}, 'PRE': {'ERROR': 0, 'WARNING': 0}}
lines = []
with open(diag_log) as f:
    for line in f:
        try:
            d = json.loads(line.strip()).get('diagnostic', {})
            sev = d.get('severity', '')
            if sev not in ('ERROR', 'WARNING'):
                continue
            path = d.get('path', '')
            msg = d.get('message', '')
            in_changed = path in changed
            target_in_diff = False
            if not in_changed and affected_labels:
                m = re.search(r'[Tt]arget not found.*?"(?:label:)?([^"]+)"', msg)
                if m and m.group(1) in affected_labels:
                    target_in_diff = True
            toctree_detached = False
            if not in_changed and toctree_changed and 'not included in any toctree' in msg.lower():
                toctree_detached = True
            kind = 'INTRO' if in_changed or target_in_diff or toctree_detached else 'PRE'
            counts[kind][sev] += 1
            lines.append(f"{kind}\t{sev}\t{path}\t{d.get('start','?')}\t{msg}")
        except:
            pass
c = counts
print(f"COUNTS\t{c['INTRO']['ERROR']}\t{c['INTRO']['WARNING']}\t{c['PRE']['ERROR']}\t{c['PRE']['WARNING']}")
for l in lines:
    print(l)
PYEOF
  )

  local intro_err intro_warn pre_err pre_warn
  IFS=$'\t' read -r _ intro_err intro_warn pre_err pre_warn \
    <<< "$(echo "$categorized" | grep '^COUNTS')"

  log "[snooty] introduced: errors=${intro_err} warnings=${intro_warn} | pre-existing: errors=${pre_err} warnings=${pre_warn} | diagnostics=$diag_log"

  if [[ ${intro_err:-0} -gt 0 || ${intro_warn:-0} -gt 0 ]]; then
    log_raw "===== SNOOTY INTRODUCED DIAGNOSTICS ====="
    echo "$categorized" | grep '^INTRO' >>"$LOG"
    log_raw "===== END INTRODUCED ====="
  fi
  if [[ ${pre_err:-0} -gt 0 || ${pre_warn:-0} -gt 0 ]]; then
    log_raw "===== SNOOTY PRE-EXISTING DIAGNOSTICS (not blocking) ====="
    echo "$categorized" | grep '^PRE' >>"$LOG"
    log_raw "===== END PRE-EXISTING ====="
  fi

  [[ ${intro_err:-0} -gt 0 ]] && OVERALL_RC=1
}

PROJECTS=$(detect_projects)
if [[ -z "$PROJECTS" ]]; then
  log "no pending content/ changes"
  echo "$LOG"
  exit 0
fi

log "projects: $(echo $PROJECTS | tr '\n' ' ')"

OVERALL_RC=0

for project in $PROJECTS; do
  if [[ ! -f "${REPO_ROOT}/content/${project}/snooty.toml" ]] && \
     ! find "${REPO_ROOT}/content/${project}" -maxdepth 2 -name snooty.toml -print -quit 2>/dev/null | grep -q .; then
    log "skip $project: no snooty.toml found (not a docs site)"
    continue
  fi

  while IFS= read -r snooty_root; do
    [[ -z "$snooty_root" ]] && continue
    run_snooty "$project" "$snooty_root"
  done < <(find_snooty_roots_for_project "$project" | sort -u)
done

log "done (rc=$OVERALL_RC)"
ln -sf "$LOG" /tmp/lbc-latest.log
echo "$LOG"
exit $OVERALL_RC
