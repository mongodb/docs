#!/usr/bin/env python3
"""Consolidated fixer: runs dedent, wrap-completions, and general RST fixes in one script.

Usage:
  consolidated-fixers.py [--apply] [--scope PATH]

Behavior:
  - Dedent odd literalinclude directives for a small, configurable set of files.
  - Wrap completion example lines into ``.. code-block:: console`` blocks.
  - Normalize inline monospace, tidy trailing spaces, and normalize directive
    option indentation for all files under the scope, respecting a SKIP_LIST.

This replaces the separate dedent/wrap/JS-fixer scripts. It overwrites files
in-place when run with --apply (no timestamped backups).
"""

from pathlib import Path
import argparse
import sys
import re
import difflib


def load_config(script_dir: Path):
    # SKIP_GENERAL_FILENAMES: filenames to skip during the general fixes pass (fix_scope).
    SKIP_GENERAL_FILENAMES = [
        'atlas-api-clusters-createCluster.txt',
        'atlas-api-databaseUsers-createDatabaseUser.txt',
        'atlas-api-rollingIndex-createRollingIndex.txt',
        'atlas-api-cloudBackups-createExportBucket.txt',
        'atlas-completion-powershell.txt',
        'atlas-completion-zsh.txt',
        'atlas-completion-fish.txt',
        'atlas-api-clusters-createCluster.rst',
        'atlas-api-databaseUsers-createDatabaseUser.rst',
        'atlas-api-rollingIndex-createRollingIndex.rst',
        'atlas-api-cloudBackups-createExportBucket.rst',
        'atlas-completion-powershell.rst',
        'atlas-completion-zsh.rst',
        'atlas-completion-fish.rst',
    ]

    # DEDENT_INCLUDES: explicit include list for files to run the dedent pass on.
    DEDENT_INCLUDES = [
        'atlas-api-clusters-createCluster.txt',
        'atlas-api-databaseUsers-createDatabaseUser.txt',
        'atlas-api-rollingIndex-createRollingIndex.txt',
        'atlas-api-cloudBackups-createExportBucket.txt',
        'atlas-api-clusters-createCluster.rst',
        'atlas-api-databaseUsers-createDatabaseUser.rst',
        'atlas-api-rollingIndex-createRollingIndex.rst',
        'atlas-api-cloudBackups-createExportBucket.rst',
    ]

    # Completion patterns (exact-match when stripped)
    PATTERNS = {
        'atlas completion fish | source',
        'atlas completion fish > ~/.config/fish/completions/atlas.fish',
        'echo "autoload -U compinit; compinit" >> ~/.zshrc',
        'source <(atlas completion zsh)',
        'atlas completion zsh > "${fpath[1]}/_atlas"',
        'atlas completion zsh > $(brew --prefix)/share/zsh/site-functions/_atlas',
        'atlas completion powershell | Out-String | Invoke-Expression',
    }

    # Only these files are considered for the completion wrapper step. This
    # is an include-list rather than a skip-list.
    COMPLETION_INCLUDES = [
        'atlas-completion-zsh.txt',
        'atlas-completion-powershell.txt',
        'atlas-completion-fish.txt',
        'atlas-completion-zsh.rst',
        'atlas-completion-powershell.rst',
        'atlas-completion-fish.rst',
    ]

    # Return SKIP_GENERAL_FILENAMES first, then the explicit dedent include list.
    return SKIP_GENERAL_FILENAMES, DEDENT_INCLUDES, PATTERNS, COMPLETION_INCLUDES


def should_skip(abs_path: str, skip_list):
    for s in skip_list:
        if abs_path.endswith(s):
            return True
    return False


def dedent_literalincludes(path: Path, apply: bool) -> int:
    text = path.read_text(encoding='utf-8')
    lines = text.splitlines()
    out = list(lines)
    changed = False
    lit_count = 0

    i = 0
    while i < len(out):
        line = out[i]
        stripped = line.lstrip(' ')
        if stripped.startswith('.. literalinclude::'):
            lit_count += 1
            is_odd = (lit_count % 2) == 1
            if is_odd:
                leading = len(line) - len(stripped)
                remove = min(3, leading)
                if remove > 0:
                    out[i] = line[remove:]
                    changed = True

            j = i + 1
            while j < len(out) and out[j].strip() == '':
                j += 1

            opt_index = None
            k = j
            while k < len(out):
                s = out[k].lstrip(' ')
                if s.startswith(':'):
                    if s.startswith(':language:'):
                        opt_index = k
                        break
                    k += 1
                    continue
                if out[k].startswith(' ') or out[k].startswith('\t'):
                    k += 1
                    continue
                break

            if opt_index is not None:
                if is_odd:
                    opt_line = out[opt_index]
                    opt_stripped = opt_line.lstrip(' ')
                    leading_opt = len(opt_line) - len(opt_stripped)
                    remove_opt = min(3, leading_opt)
                    if remove_opt > 0:
                        out[opt_index] = opt_line[remove_opt:]
                        changed = True

                after = opt_index + 1
                while after < len(out) and out[after].strip() == '':
                    out.pop(after)
                    changed = True
                if after >= len(out) or out[after].strip() != '':
                    out.insert(after, '')
                    changed = True

            i = max(i + 1, (opt_index or i) + 2)
            continue
        i += 1

    if not changed:
        print(f'No dedent changes for {path}')
        return 0

    old = text
    new = '\n'.join(out)
    if not new.endswith('\n'):
        new += '\n'
    diff = ''.join(difflib.unified_diff(old.splitlines(keepends=True), new.splitlines(keepends=True), fromfile=str(path), tofile=str(path) + '.fixed'))
    print(f'--- Dedent proposed changes for {path} (literalincludes counted: {lit_count})')
    print(diff)

    if apply:
        path.write_text(new, encoding='utf-8')
        print(f'Wrote {path}')
        return 1
    return 0


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

    while i < len(lines):
        if is_command_like(lines[i]):
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
    diff = ''.join(difflib.unified_diff(old.splitlines(keepends=True), new.splitlines(keepends=True), fromfile=str(path), tofile=str(path) + '.fixed'))
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
        # Replace `x` -> ``x`` conservatively, but keep single backticks for
        # URLs and for apparent reStructuredText roles like "ref:`...`"
        def _repl(m):
            inner = m.group(1)
            # keep single backticks if it looks like a URL
            if re.search(r'https?://', inner):
                return '`' + inner + '`'
            # keep single backticks when the opening backtick is immediately
            # preceded by a colon (e.g., ref:`label` or :ref:`label`)
            if m.start() > 0 and line[m.start() - 1] == ':':
                return '`' + inner + '`'
            # default: convert to double backticks for inline monospace
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

            for o in options: out.append(o)
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

            for cb in contentBlock: out.append(cb)
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
        if not new.endswith('\n'): new += '\n'
        if new != txt:
            diff = ''.join(difflib.unified_diff(txt.splitlines(keepends=True), new.splitlines(keepends=True), fromfile=str(f), tofile=str(f) + '.fixed'))
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

    script_dir = Path(__file__).parent
    skip_general_filenames, dedent_includes, patterns, completion_includes = load_config(script_dir)

    repo_root = script_dir.resolve().parents[3]
    scope = Path(ns.scope) if ns.scope else repo_root / 'content' / 'atlas-cli' / 'upcoming' / 'source'

    if not scope.exists():
        print('Scope not found:', scope, file=sys.stderr)
        sys.exit(2)

    # Build the full skip list by joining each filename to the scope directory
    skip_general = [str((scope / fname).resolve()) for fname in skip_general_filenames]

    total_changes = 0

    # 1) dedent specific files (explicit include list)
    for name in dedent_includes:
        p = scope / name
        if p.exists():
            total_changes += dedent_literalincludes(p, ns.apply)

    # 2) general fixes across scope (use SKIP_GENERAL)
    total_changes += fix_scope(scope, skip_general, ns.apply)

    # 3) wrap completions if present (use explicit include list)
    for name in completion_includes:
        p = scope / name
        if p.exists():
            total_changes += wrap_completions_in_file(p, patterns, ns.apply)
        else:
            print(f'No completion file: {p}')

    print('\nAll consolidated steps finished. If --apply was used, files may have been modified in-place.')
    sys.exit(0)


if __name__ == '__main__':
    main()
