#!/usr/bin/env python3
"""Orchestrator: run the three atlas-cli fixer scripts in sequence.

Usage:
  run-all-fixers.py [--apply] [--scope PATH]

Defaults:
  scope: content/atlas-cli/upcoming/source

Behavior:
  - Runs the dedent script, the wrap-completions script (targeting completion
    files in the scope), and the conservative JS fixer in sequence.
  - By default runs in dry-run mode. Pass --apply to write changes.
  - Prints each tool's stdout/stderr and a small summary.
"""

from pathlib import Path
import subprocess
import argparse
import sys


def run_cmd(cmd, cwd=None):
    print('\n>>> Running:', ' '.join(cmd))
    p = subprocess.run(cmd, cwd=cwd, text=True, capture_output=True)
    print('--- exit code:', p.returncode)
    if p.stdout:
        print('--- stdout:\n', p.stdout)
    if p.stderr:
        print('--- stderr:\n', p.stderr)
    return p.returncode


def main():
  parser = argparse.ArgumentParser()
  parser.add_argument('--apply', action='store_true')
  parser.add_argument('--scope', type=str, default=None)
  ns = parser.parse_args()

  # script is at content/tools/atlas-cli-commands-toc/, repo root is three levels up
  repo_root = Path(__file__).resolve().parents[3]
  scope = Path(ns.scope) if ns.scope else repo_root / 'content' / 'atlas-cli' / 'upcoming' / 'source'

  consolidated = repo_root / 'content' / 'tools' / 'atlas-cli-commands-toc' / 'consolidated-fixers.py'

  if not scope.exists():
    print('Scope not found:', scope, file=sys.stderr)
    return 2

  # Run consolidated fixer
  consolidated_cmd = ['python3', str(consolidated)]
  if ns.apply:
    consolidated_cmd.append('--apply')
  consolidated_cmd += ['--scope', str(scope)]

  rc = run_cmd(consolidated_cmd, cwd=str(repo_root))
  if rc != 0:
    print('Consolidated fixer returned non-zero:', rc)

  print('\nAll steps finished. If --apply was used, files may have been modified in-place.')
  return 0


if __name__ == '__main__':
    sys.exit(main())
