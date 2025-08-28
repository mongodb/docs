#!/usr/bin/env python3
"""
reStructuredText Syntax Fixer for Atlas CLI Documentation

This script fixes common reStructuredText syntax issues in Atlas CLI command files.
It can be run on both .txt and .rst files in the command directories.

Usage:
    python3 fix_rst_syntax.py [directory_path]
    
If no directory is provided, it will process both:
- ../../atlas-cli/upcoming/source/command/ (.txt files)
- ../../atlas/source/includes/command/ (.rst files)
"""

import os
import re
import glob
import sys
import argparse
from pathlib import Path


def fix_backticks(content):
    """Fix single backticks to double backticks for monospace text."""
    fixes = [
        ('`mongos`', '``mongos``'),
        ('(`&`)', '(``&``)'),
        ('`admin`', '``admin``'),
        ('(`%2F`)', '(``%2F``)'),
        ('"flattenTeams" : true', '``"flattenTeams" : true``'),
        ('"includeOrgUsers": true', '``"includeOrgUsers": true``'),
        ('repeat the `m` parameter', 'repeat the ``m`` parameter'),
    ]
    
    for old, new in fixes:
        content = content.replace(old, new)
    
    return content


def fix_tabs_structure(content):
    """Fix tabs structure to ensure content is properly indented."""
    lines = content.split('\n')
    fixed_lines = []
    in_tabs = False
    in_tab = False
    
    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.strip()
        
        if stripped.startswith('.. tabs::'):
            fixed_lines.append(line)
            in_tabs = True
        elif in_tabs and stripped.startswith('.. tab::'):
            # This is a tab directive
            fixed_lines.append('   ' + stripped)
            in_tab = True
            i += 1
            # Handle the tabid line
            if i < len(lines) and lines[i].strip().startswith(':tabid:'):
                fixed_lines.append('      ' + lines[i].strip())
                i += 1
            # Add blank line
            fixed_lines.append('')
            continue
        elif in_tab and (stripped.startswith('.. tab::') or (stripped and not line.startswith(' '))):
            # End of current tab or start of new section
            if stripped.startswith('.. tab::'):
                # New tab
                fixed_lines.append('   ' + stripped)
                i += 1
                if i < len(lines) and lines[i].strip().startswith(':tabid:'):
                    fixed_lines.append('      ' + lines[i].strip())
                    i += 1
                fixed_lines.append('')
                continue
            else:
                # End of tabs
                in_tabs = False
                in_tab = False
                fixed_lines.append(line)
        elif in_tab:
            # Content inside a tab - should be indented to 6 spaces
            if stripped:
                if stripped.startswith('.. literalinclude::'):
                    fixed_lines.append('      ' + stripped)
                    # Handle the next line which should be :language:
                    if i + 1 < len(lines) and lines[i + 1].strip().startswith(':language:'):
                        i += 1
                        fixed_lines.append('         ' + lines[i].strip())
                elif stripped.startswith(':language:'):
                    fixed_lines.append('         ' + stripped)
                elif stripped.startswith('After creating'):
                    fixed_lines.append('')
                    fixed_lines.append('      ' + stripped)
                else:
                    fixed_lines.append('      ' + stripped)
            else:
                fixed_lines.append('')
        else:
            fixed_lines.append(line)
        
        i += 1
    
    return '\n'.join(fixed_lines)


def fix_indentation_issues(content):
    """Fix common indentation problems in literalinclude blocks."""
    
    # Fix incorrect indentation of literalinclude blocks
    content = re.sub(
        r'(\n\s+Create the file.*?``payload\.json``\n\n)\s{6,}(\.\. literalinclude::.*?\n\s+:language: shell)\n(\s+After creating)', 
        r'\1   \2\n\n\3', 
        content, 
        flags=re.DOTALL
    )
    
    # Fix the "After creating" line indentation 
    content = re.sub(r'\n\s{6,}(After creating ``payload\.json``)', r'\n   \1', content)
    
    # Fix literalinclude blocks that are too indented
    content = re.sub(r'\n\s{9,}(\.\. literalinclude::.*?\n\s+:language: shell)', r'\n   \1', content)
    
    return content

def fix_example_block_indentation(content):
    """Fix indentation issues in example blocks outside of tabs."""
    
    # Fix incorrectly indented literalinclude blocks that should be at the same level
    content = re.sub(
        r'^(\s*Create the file below and save it as ``[^`]+``)\n\n\s{3,}(\.\. literalinclude::)',
        r'\1\n\n\2',
        content,
        flags=re.MULTILINE
    )
    
    # Fix "After creating" text that should not be indented when it follows an indented literalinclude
    content = re.sub(
        r'(\.\. literalinclude::.*?\n\s+:language: shell)\n([A-Z][^.\n]*creating ``[^`]+``, run the command below)',
        r'\1\n\n\2',
        content,
        flags=re.DOTALL
    )
    
    # Fix literalinclude blocks that are over-indented (should be 3 spaces, not more)
    content = re.sub(
        r'^\s{4,}(\.\. literalinclude::)',
        r'   \1',
        content,
        flags=re.MULTILINE
    )
    
    # Fix language specification that's over-indented
    content = re.sub(
        r'^\s{7,}(:language:)',
        r'      \1',
        content,
        flags=re.MULTILINE
    )
    
    return content

def fix_duplicate_directives(content):
    """Fix duplicate directives like duplicate :language: specifications."""
    
    # Fix duplicate :language: shell lines
    content = re.sub(
        r'(:language: shell)\s*\n\s*:language: shell',
        r'\1',
        content,
        flags=re.MULTILINE
    )
    
    return content


def sync_atlas_cli_to_atlas(atlas_cli_dir, atlas_dir):
    """Sync files from atlas-cli directory to atlas directory with proper extensions."""
    
    if not os.path.exists(atlas_cli_dir) or not os.path.exists(atlas_dir):
        return
    
    pattern = os.path.join(atlas_cli_dir, "atlas-*.txt")
    files = glob.glob(pattern)
    
    for src_file in files:
        # Get the base filename without extension
        base_name = os.path.basename(src_file)
        base_name_no_ext = os.path.splitext(base_name)[0]
        
        # Determine the target extension
        if base_name_no_ext.startswith('atlas-kubernetes'):
            # Kubernetes files should be .rst in atlas directory
            target_ext = '.rst'
        else:
            # Other files should also be .rst in atlas directory
            target_ext = '.rst'
        
        target_file = os.path.join(atlas_dir, base_name_no_ext + target_ext)
        
        try:
            import shutil
            shutil.copy2(src_file, target_file)
            print(f"  Synced: {base_name} -> {os.path.basename(target_file)}")
        except Exception as e:
            print(f"  Error syncing {base_name}: {e}")
    
    return len(files)

def fix_completion_files(content):
    """Fix completion files with tab structures."""
    
    # Fix tab-indented content in completion files
    lines = content.split('\n')
    fixed_lines = []
    
    for line in lines:
        if line.startswith('\t') and line.strip():
            # Convert tab-indented lines to code blocks
            fixed_lines.append('')
            fixed_lines.append('.. code-block::')
            fixed_lines.append('')
            fixed_lines.append('   ' + line.strip())
            fixed_lines.append('')
        else:
            fixed_lines.append(line)
    
    return '\n'.join(fixed_lines)


def fix_url_markup(content):
    """Fix URLs that should be properly marked up."""
    
    # Fix unescaped API endpoint URLs (this is a more complex pattern)
    content = re.sub(
        r'This command is autogenerated and corresponds 1:1 with the Atlas API endpoint (https://www\.mongodb\.com/docs/api/doc/atlas-admin-api-v2/operation/operation-[^.]+)\.',
        r'This command is autogenerated and corresponds 1:1 with the Atlas API endpoint `\1 <\1>`__.',
        content
    )
    
    # Fix profile documentation URLs
    content = re.sub(
        r'To learn about profiles for the Atlas CLI, see (https://dochub\.mongodb\.org/core/atlas-cli-save-connection-settings)\.',
        r'To learn about profiles for the Atlas CLI, see `\1 <\1>`__.',
        content
    )
    
    return content


def process_file(filepath):
    """Process a single file to fix reStructuredText syntax issues."""
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Apply all fixes
        content = fix_backticks(content)
        content = fix_tabs_structure(content)
        content = fix_indentation_issues(content)
        content = fix_example_block_indentation(content)
        content = fix_duplicate_directives(content)
        content = fix_url_markup(content)
        
        # Special handling for completion files
        filename = os.path.basename(filepath)
        if 'completion' in filename:
            content = fix_completion_files(content)
        
        # Only write if content changed
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        
        return False
        
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return False


def process_directory(directory_path, file_pattern):
    """Process all files matching the pattern in the given directory."""
    
    if not os.path.exists(directory_path):
        print(f"Directory not found: {directory_path}")
        return
    
    pattern = os.path.join(directory_path, file_pattern)
    files = glob.glob(pattern)
    
    if not files:
        print(f"No files found matching pattern: {pattern}")
        return
    
    print(f"Processing {len(files)} files in {directory_path}")
    
    fixed_count = 0
    for filepath in files:
        if process_file(filepath):
            fixed_count += 1
            print(f"  Fixed: {os.path.basename(filepath)}")
    
    print(f"Fixed {fixed_count} files out of {len(files)} total")


def main():
    parser = argparse.ArgumentParser(
        description="Fix reStructuredText syntax issues in Atlas CLI documentation files"
    )
    parser.add_argument(
        'directory', 
        nargs='?', 
        help='Directory to process (if not provided, processes both atlas-cli and atlas directories)'
    )
    parser.add_argument(
        '--pattern', 
        default='atlas-*.txt atlas-*.rst', 
        help='File pattern to match (default: atlas-*.txt atlas-*.rst)'
    )
    parser.add_argument(
        '--dry-run', 
        action='store_true', 
        help='Show what would be fixed without making changes'
    )
    
    args = parser.parse_args()
    
    # Get the script directory to find the default paths
    script_dir = Path(__file__).parent.parent.parent
    
    if args.directory:
        # Process specified directory
        patterns = args.pattern.split()
        for pattern in patterns:
            process_directory(args.directory, pattern)
    else:
        # Process both default directories
        atlas_cli_dir = script_dir / "content/atlas-cli/upcoming/source/command"
        atlas_includes_dir = script_dir / "content/atlas/source/includes/command"
        
        print("=" * 60)
        print("Fixing reStructuredText syntax issues in Atlas CLI files")
        print("=" * 60)
        
        # Process atlas-cli directory (.txt files)
        if atlas_cli_dir.exists():
            print(f"\n1. Processing Atlas CLI directory:")
            process_directory(str(atlas_cli_dir), "atlas-*.txt")
        else:
            print(f"Atlas CLI directory not found: {atlas_cli_dir}")
        
        # Process atlas includes directory (.rst files)  
        if atlas_includes_dir.exists():
            print(f"\n2. Processing Atlas includes directory:")
            process_directory(str(atlas_includes_dir), "atlas-*.rst")
        else:
            print(f"Atlas includes directory not found: {atlas_includes_dir}")
        
        print(f"\n{'=' * 60}")
        print("Syntax fixing complete!")
        print("=" * 60)


if __name__ == "__main__":
    main()
