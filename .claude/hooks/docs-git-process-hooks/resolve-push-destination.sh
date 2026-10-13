#!/usr/bin/env bash
#
# resolve-push-destination.sh
#
# Reads a Claude Code PreToolUse hook payload on stdin and prints, one per
# line, the remote branch(es) that a `git push` command would write to.
#
# Output line format: <mode>:<branch>
#   push:<branch>     a normal push of <branch>
#   delete:<branch>   deletion of remote <branch>
#   all:              --all (every matching local branch)
#   mirror:           --mirror
#
# Prints nothing when the command is not a branch push (for example a
# --tags-only push), when HEAD is detached, or when no destination can be
# determined. Callers treat "no output" as "nothing to guard".
#
# The command is split into shell subcommands first, and only a subcommand
# that actually runs `git push` is parsed. This keeps the phrase "git push"
# inside an unrelated argument -- `echo "git push would ..."`, a commit
# message, etc. -- from being mistaken for the command being run.
#
# This is a best-effort parser, not a git reimplementation. It recognises the
# shapes that matter for the push guards and stays silent on anything it
# cannot parse, so an unparsed command never blocks work.

set -uo pipefail

input=$(cat)
cmd=$(printf '%s' "$input" | jq -r '.tool_input.command // empty' 2>/dev/null)
[[ -z "$cmd" ]] && exit 0

# Current branch; a detached HEAD has no branch to compare against.
current=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
[[ -z "$current" || "$current" == "HEAD" ]] && exit 0

normalize() {
  local b="$1"
  b=${b#refs/heads/}
  if [[ "$b" == "HEAD" || "$b" == "@" ]]; then b="$current"; fi
  printf '%s' "$b"
}

emit_refspec() {
  local spec="$1" src dst
  spec=${spec#+}                    # strip a leading force '+'
  if [[ "$spec" == *:* ]]; then
    src=${spec%%:*}
    dst=${spec#*:}
    [[ -z "$dst" ]] && return       # 'src:' with empty destination is a no-op
    if [[ -z "$src" ]]; then
      echo "delete:$(normalize "$dst")"
    else
      echo "push:$(normalize "$dst")"
    fi
  else
    echo "push:$(normalize "$spec")"
  fi
}

# Resolve a bare push (no refspec) through the current branch's upstream.
emit_upstream() {
  local upstream dest
  upstream=$(git rev-parse --abbrev-ref --symbolic-full-name '@{u}' 2>/dev/null)
  [[ -z "$upstream" ]] && return
  dest=${upstream#*/}               # strip the remote name
  echo "push:$dest"
}

# Parse the argument string of a single `git push` subcommand.
handle_args() {
  local args="$1" t part spec
  local mode=push tags=0 skip_next=0
  local -a toks=()
  local -a positionals=()

  read -r -a toks <<< "$args"

  if [[ ${#toks[@]} -gt 0 ]]; then
    for t in "${toks[@]}"; do
      # A shell operator or redirection ends the push command. Without this, a
      # trailing `2>&1` or `> /dev/null` is parsed as an extra refspec and a
      # bogus branch name (e.g. "2>&1") gets guarded. Keep refspec text glued
      # to the operator (`main&&echo` -> `main`); a leading redirection digit
      # (`2>&1`) yields nothing. (case, not [[ ]], because bash 3.2's [[ ]]
      # parser rejects a literal `|` inside a bracket expression.)
      case "$t" in
        *'|'*|*'&'*|*';'*|*'<'*|*'>'*)
          part=${t%%[|&;<>]*}
          [[ "$part" =~ ^[0-9]*$ ]] && part=""
          [[ -n "$part" ]] && positionals+=("$part")
          break ;;
      esac
      if (( skip_next )); then skip_next=0; continue; fi
      case "$t" in
        --dry-run|-n)        exit 0 ;;         # nothing is written
        --all)               echo "all:";    exit 0 ;;
        --mirror)            echo "mirror:"; exit 0 ;;
        --tags)              tags=1; continue ;;
        -d|--delete)         mode=delete; continue ;;
        --force-with-lease|--force-with-lease=*|--force-if-includes|--no-force-with-lease)
                             continue ;;
        -o|--push-option|--repo|--receive-pack|--exec|--recurse-submodules)
                             skip_next=1; continue ;;
        -*)                  continue ;;        # other flags (incl. --flag=value)
        *)                   positionals+=("$t") ;;
      esac
    done
  fi

  # Bare `git push` / `git push <remote>`: destination comes from the upstream.
  if [[ ${#positionals[@]} -le 1 ]]; then
    (( tags )) && return 0              # --tags only: no branch is pushed
    emit_upstream
    return 0
  fi

  for spec in "${positionals[@]:1}"; do
    emit_refspec "$spec"
  done
}

# Split the command into subcommands on `;`, `|`, `&&`, `||` and newlines, then
# parse only the subcommand(s) that run `git push`.
subcmds=$(printf '%s' "$cmd" | sed 's/&&/;/g; s/||/;/g' | tr ';|' '\n\n')

while IFS= read -r sub; do
  grep -E '^[[:space:]]*([A-Za-z_][A-Za-z0-9_]*=[^[:space:]]*[[:space:]]+)*git[[:space:]]+push([[:space:]]|$)' \
    <<< "$sub" > /dev/null || continue
  args=$(sed -E 's/^[[:space:]]*([A-Za-z_][A-Za-z0-9_]*=[^[:space:]]*[[:space:]]+)*git[[:space:]]+push//' <<< "$sub")
  handle_args "$args"
done <<< "$subcmds"

exit 0
