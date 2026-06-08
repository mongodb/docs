#!/usr/bin/env python3
"""Consolidated fixer for MongoCLI command docs.

Usage:
  consolidated-fixers.py [--apply] [--scope PATH]

Behavior:
  - Wraps completion example lines into ``.. code-block:: console`` blocks
    for mongocli-completion-<shell>.txt files.
  - Normalizes inline monospace, directive option indentation, and trailing
    spaces for all files under the scope, respecting a skip list.

This script is the MongoCLI equivalent of the atlas-cli consolidated-fixers.
Run with --apply to write changes in-place (default is dry-run).
"""

from pathlib import Path
import argparse
import sys
import re
import difflib


def load_config():
    # Completion files are skipped by the general fixer and handled separately.
    SKIP_GENERAL_FILENAMES = [
        'mongocli-completion-bash.txt',
        'mongocli-completion-fish.txt',
        'mongocli-completion-powershell.txt',
        'mongocli-completion-zsh.txt',
    ]

    # Exact-match patterns (stripped) that should be wrapped in code-block:: console.
    PATTERNS = {
        'mongocli completion bash',
        'mongocli completion fish | source',
        'mongocli completion fish > ~/.config/fish/completions/mongocli.fish',
        'echo "autoload -U compinit; compinit" >> ~/.zshrc',
        'source <(mongocli completion zsh)',
        'mongocli completion zsh > "${fpath[1]}/_mongocli"',
        'mongocli completion zsh > $(brew --prefix)/share/zsh/site-functions/_mongocli',
        'mongocli completion powershell | Out-String | Invoke-Expression',
        'source /etc/bash_completion.d/mongocli',
    }

    # Only these files are candidates for the completion-wrapper step.
    COMPLETION_INCLUDES = [
        'mongocli-completion-bash.txt',
        'mongocli-completion-fish.txt',
        'mongocli-completion-powershell.txt',
        'mongocli-completion-zsh.txt',
    ]

    return SKIP_GENERAL_FILENAMES, PATTERNS, COMPLETION_INCLUDES


def should_skip(abs_path: str, skip_list):
    for s in skip_list:
        if abs_path.endswith(s):
            return True
    return False


def wrap_completions_in_file(path: Path, patterns: set, apply: bool) -> int:
    text = path.read_text(encoding='utf-8')
    lines = text.splitlines()
    out = []
    i = 0
    changed = False

    def is_command_like(line: str) -> bool:
        s = line.strip()
        return bool(s) and s in patterns

    def already_in_codeblock(lines, start_idx):
        i = start_idx - 1
        while i >= 0 and lines[i].strip() == '':
            i -= 1
        if i >= 0:
            prev = lines[i].lstrip()
            if prev.startswith('.. code-block::') or prev.endswith('::'):
                return True
        return False

    def is_heading_underline(line: str) -> bool:
        s = line.strip()
        return len(s) >= 2 and s[0] in '=-~^#+_*' and all(c == s[0] for c in s)

    def is_heading_title(lines, idx):
        # A line is a heading title if the next non-empty line is an underline.
        j = idx + 1
        while j < len(lines) and lines[j].strip() == '':
            j += 1
        return j < len(lines) and is_heading_underline(lines[j])

    while i < len(lines):
        if is_command_like(lines[i]):
            if is_heading_title(lines, i):
                out.append(lines[i]); i += 1; continue
            if already_in_codeblock(lines, i):
                out.append(lines[i]); i += 1; continue

            start = i
            j = i
            while j < len(lines):
                if is_command_like(lines[j]):
                    j += 1; continue
                if lines[j].strip() == '':
                    k = j + 1
                    if k < len(lines) and is_command_like(lines[k]):
                        j = k; continue
                break

            group = lines[start:j]
            if len(out) > 0 and out[-1].strip() != '':
                out.append('')
            out.append('.. code-block:: console')
            out.append('')
            for gl in group:
                out.append('   ' + gl.strip())
            if j < len(lines) and lines[j].strip() != '':
                out.append('')
            changed = True
            i = j
            continue
        out.append(lines[i]); i += 1

    if not changed:
        print(f'No completion-wrap changes for {path}')
        return 0

    old = text
    new = '\n'.join(out) + '\n'
    diff = ''.join(difflib.unified_diff(
        old.splitlines(keepends=True),
        new.splitlines(keepends=True),
        fromfile=str(path),
        tofile=str(path) + '.fixed',
    ))
    print(f'--- Wrap completions proposed changes for {path}')
    print(diff)

    if apply:
        path.write_text(new, encoding='utf-8')
        print(f'Wrote {path}')
        return 1
    return 0


def normalize_inline_monospace(lines: list) -> list:
    out = list(lines)
    for i, line in enumerate(out):
        if re.match(r'^\s*```', line):
            continue
        if re.match(r'^\s*\.\.', line):
            continue

        def _repl(m):
            inner = m.group(1)
            if re.search(r'https?://', inner):
                return '`' + inner + '`'
            if m.start() > 0 and line[m.start() - 1] == ':':
                return '`' + inner + '`'
            return '``' + inner + '``'

        out[i] = re.sub(r'(?<!`)`([^`\n]+?)`(?!`)', _repl, line)
    return out


def fix_directives(lines: list) -> list:
    out = []
    i = 0
    while i < len(lines):
        line = lines[i]
        m = re.match(r'^\s*\.\.\s+(literalinclude|code-block|code|parsed-literal|highlight)::(.*)$', line)
        if m:
            dir_name = m.group(1)
            rest = m.group(2).strip()
            out.append(f'.. {dir_name}::' + (f' {rest}' if rest else ''))

            j = i + 1
            options = []
            while j < len(lines):
                nxt = lines[j]
                if re.match(r'^\s*:[A-Za-z0-9-]+:', nxt.strip()):
                    options.append('   ' + nxt.strip())
                    j += 1; continue
                if options and re.match(r'^\s{3,}\S+', nxt):
                    options.append('   ' + nxt.strip()); j += 1; continue
                break

            for o in options:
                out.append(o)
            nextLine = lines[j] if j < len(lines) else ''
            if nextLine.strip() != '':
                out.append('')

            k = j
            contentBlock = []
            while k < len(lines):
                cur = lines[k]
                if re.match(r'^\s*\.\.', cur) and not re.match(r'^\s{3,}', cur):
                    break
                if cur.strip() == '':
                    contentBlock.append(''); k += 1
                    p = k
                    while p < len(lines) and lines[p].strip() == '': p += 1
                    if p >= len(lines): break
                    if not re.match(r'^\s+', lines[p]): break
                    continue
                if re.match(r'^\s+', cur):
                    contentBlock.append('   ' + cur.strip()); k += 1; continue
                break

            for cb in contentBlock:
                out.append(cb)
            i = max(i, (k - 1))
            i += 1
            continue
        out.append(line); i += 1
    return out


def tidy_trailing_spaces(lines: list) -> list:
    return [re.sub(r'[ \t]+$', '', l) for l in lines]


def fix_scope(scope: Path, skip_list: list, apply: bool) -> int:
    files = []
    for p in scope.rglob('*'):
        if p.is_file() and p.suffix in {'.txt', '.rst', '.md'}:
            files.append(p)

    report = []
    for f in files:
        absf = str(f.resolve())
        if should_skip(absf, skip_list):
            print(f'Skipping {f}')
            continue
        txt = f.read_text(encoding='utf-8')
        lines = txt.splitlines()
        lines = normalize_inline_monospace(lines)
        lines = fix_directives(lines)
        lines = tidy_trailing_spaces(lines)
        new = '\n'.join(lines)
        if not new.endswith('\n'):
            new += '\n'
        if new != txt:
            diff = ''.join(difflib.unified_diff(
                txt.splitlines(keepends=True),
                new.splitlines(keepends=True),
                fromfile=str(f),
                tofile=str(f) + '.fixed',
            ))
            print(f'--- Proposed general fixes for {f}')
            print(diff)
            report.append(f)
            if apply:
                f.write_text(new, encoding='utf-8')
                print(f'Wrote {f}')

    print(f'Scanned {len(files)} file(s). Proposed changes: {len(report)}. Apply: {apply}')
    return len(report)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--apply', action='store_true')
    parser.add_argument('--scope', type=str, default=None)
    ns = parser.parse_args()

    skip_general_filenames, patterns, completion_includes = load_config()

    script_dir = Path(__file__).parent
    repo_root = script_dir.resolve().parents[3]
    scope = Path(ns.scope) if ns.scope else repo_root / 'content' / 'mongocli' / 'upcoming' / 'source'

    if not scope.exists():
        print('Scope not found:', scope, file=sys.stderr)
        sys.exit(2)

    # Use rglob to locate completion files anywhere under scope (handles both
    # scope=source and scope=source/command invocation patterns).
    skip_general = []
    for fname in skip_general_filenames:
        skip_general.extend([str(p.resolve()) for p in scope.rglob(fname)])

    total_changes = 0

    # 1) General fixes across scope (skip completion files)
    total_changes += fix_scope(scope, skip_general, ns.apply)

    # 2) Wrap completions (explicit include list)
    for name in completion_includes:
        found = list(scope.rglob(name))
        if found:
            for p in found:
                total_changes += wrap_completions_in_file(p, patterns, ns.apply)
        else:
            print(f'No completion file found: {name}')

    print('\nAll consolidated steps finished. If --apply was used, files may have been modified in-place.')
    sys.exit(0)


if __name__ == '__main__':
    main()
