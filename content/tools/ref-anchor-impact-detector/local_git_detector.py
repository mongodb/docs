#!/usr/bin/env python3
"""
Local Git-based ref anchor impact detector.

This script works with a local git repository to analyze branches or commits
for removed ref anchors and their cross-reference impacts.

Usage:
    python local_git_detector.py [options]

Examples:
    # Compare current branch with main
    python local_git_detector.py

    # Compare specific branch with main
    python local_git_detector.py --branch feature-branch

    # Compare two specific commits
    python local_git_detector.py --base main --head feature-branch

    # Compare working directory with HEAD
    python local_git_detector.py --working-dir
"""

import argparse
import subprocess
import sys
import toml
from pathlib import Path
from typing import Dict, List, Set, Tuple
import re


def parse_snooty_toml(toml_path: Path) -> List[str]:
    """
    Parse a snooty.toml configuration file to extract intersphinx URLs.

    Args:
        toml_path: Path to snooty.toml file

    Returns:
        List of intersphinx URLs
    """
    try:
        with open(toml_path, 'r', encoding='utf-8') as f:
            config = toml.load(f)

        # Extract intersphinx URLs
        intersphinx_urls = config.get('intersphinx', [])
        return intersphinx_urls if isinstance(intersphinx_urls, list) else []
    except Exception:
        return []


def build_intersphinx_dependency_graph(content_dir: Path) -> Dict[str, Set[str]]:
    """
    Build a dependency graph of which sites can reference which other sites.

    Parses snooty.toml files to understand intersphinx dependencies.

    Args:
        content_dir: Path to content directory

    Returns:
        Dict mapping site names to sets of sites they can reference
    """
    dependency_graph = {}

    # Find all snooty.toml files
    for toml_file in content_dir.rglob("snooty.toml"):
        # Extract site name from path: content/site/version/snooty.toml
        path_parts = toml_file.parts

        # Find the site name (should be content/SITE/...)
        content_index = None
        for i, part in enumerate(path_parts):
            if part == 'content':
                content_index = i
                break

        if content_index is None or content_index + 1 >= len(path_parts):
            continue

        site_name = path_parts[content_index + 1]

        # Parse the snooty.toml configuration
        intersphinx_urls = parse_snooty_toml(toml_file)

        # Extract referenced site names from URLs
        referenced_sites = set()
        for url in intersphinx_urls:
            # Map common URL patterns to site names
            if 'mongodb.com/docs/manual' in url:
                referenced_sites.add('manual')
            elif 'docs.atlas.mongodb.com' in url or 'mongodb.com/docs/atlas' in url:
                referenced_sites.add('atlas')
            elif 'mongodb.com/docs/compass' in url:
                referenced_sites.add('compass')
            elif 'mongodb.com/docs/ops-manager' in url:
                referenced_sites.add('ops-manager')
            elif 'mongodb.com/docs/cloud-manager' in url:
                referenced_sites.add('cloud-manager')
            elif 'mongodb.com/docs/realm' in url:
                referenced_sites.add('realm')
            elif 'mongodb.com/docs/app-services' in url or 'mongodb.com/docs/atlas/app-services' in url:
                referenced_sites.add('app-services')
            elif 'mongodb.com/docs/kafka-connector' in url:
                referenced_sites.add('kafka-connector')
            elif 'mongodb.com/docs/mongosync' in url or 'mongodb.com/docs/cluster-to-cluster-sync' in url:
                referenced_sites.add('mongosync')
            elif 'mongodb.com/docs/database-tools' in url:
                referenced_sites.add('database-tools')
            elif 'mongodb.com/docs/drivers' in url:
                referenced_sites.add('drivers')
            elif 'mongodb.com/docs/mongodb-shell' in url:
                referenced_sites.add('mongodb-shell')
            elif 'mongodb.com/docs/mongocli' in url:
                referenced_sites.add('mongocli')
            # Skip external domains (pymongo.readthedocs.io, etc.)

        # Store the dependencies for this site (union across all versions)
        if site_name not in dependency_graph:
            dependency_graph[site_name] = set()
        dependency_graph[site_name].update(referenced_sites)

    return dependency_graph


def get_site_name_from_path(file_path: str) -> str:
    """
    Extract site name from a file path.

    Args:
        file_path: File path like 'content/atlas/source/file.txt'

    Returns:
        Site name like 'atlas'
    """
    path_parts = file_path.split('/')
    if len(path_parts) >= 2 and path_parts[0] == 'content':
        return path_parts[1]
    return ''


def filter_references_by_intersphinx(
    references: Dict[str, List[Path]],
    anchor_to_site: Dict[str, str],
    dependency_graph: Dict[str, Set[str]],
    repo_root: Path
) -> Dict[str, List[Path]]:
    """
    Filter reference results based on intersphinx dependencies from snooty.toml files.

    Only include references from sites that can actually reference the removed anchor's site.

    Args:
        references: Dict mapping anchor names to lists of files that reference them
        anchor_to_site: Dict mapping anchor names to the sites they were removed from
        dependency_graph: Dict mapping sites to sets of sites they can reference
        repo_root: Repository root path

    Returns:
        Filtered references dict with only valid cross-site references
    """
    filtered_references = {}

    for anchor, file_paths in references.items():
        # Get the site where this anchor was removed from
        removed_from_site = anchor_to_site.get(anchor, '')
        if not removed_from_site:
            # If we can't determine the source site, include all references (conservative)
            filtered_references[anchor] = file_paths
            continue

        valid_file_paths = []

        for file_path in file_paths:
            try:
                # Get the site that contains this referencing file
                relative_path = file_path.relative_to(repo_root)
                referencing_site = get_site_name_from_path(str(relative_path))

                # Check if this is a valid reference
                if referencing_site == removed_from_site:
                    # Same site reference - always valid
                    valid_file_paths.append(file_path)
                elif referencing_site in dependency_graph and removed_from_site in dependency_graph[referencing_site]:
                    # Cross-site reference with valid intersphinx dependency
                    valid_file_paths.append(file_path)
                # else: Cross-site reference without intersphinx dependency - filtered out

            except ValueError:
                # If we can't determine the relative path, include it (conservative)
                valid_file_paths.append(file_path)

        if valid_file_paths:
            filtered_references[anchor] = valid_file_paths

    return filtered_references


def should_analyze_file_for_changes(filename: str) -> tuple[bool, str]:
    """
    Determine if we should analyze changes in this file and what type of impact.

    Analyze changes in:
    - current/ directories → immediate impact
    - upcoming/ directories → future impact (when upcoming → current)
    - manual/manual/ → immediate impact (special case)
    - Non-versioned repository files → immediate impact
    - Skip historical versions (v8.0, v7.0, etc.)

    Args:
        filename: File path from diff

    Returns:
        Tuple of (should_analyze: bool, impact_type: str)
        impact_type can be 'immediate', 'future', or ''
    """
    if not is_rst_file(filename):
        return False, ''

    # Split path into parts
    path_parts = filename.split('/')

    if len(path_parts) < 3:  # content/repo/file
        return True, 'immediate'

    # Check if this is in a versioned directory structure
    if len(path_parts) >= 4:  # content/repo/version/...
        repo_part = path_parts[1]
        version_part = path_parts[2]

        # Special case: manual repository uses manual/manual/ as current
        if repo_part == 'manual' and version_part == 'manual':
            return True, 'immediate'

        # Analyze current/ → immediate impact
        if version_part in ['current', 'master', 'main']:
            return True, 'immediate'

        # Analyze upcoming/ → future impact
        if version_part == 'upcoming':
            return True, 'future'

        # Skip historical versions (v8.0, v7.0, etc.)
        if version_part.startswith('v') and any(c.isdigit() for c in version_part):
            return False, ''

    # Default: analyze the file (probably non-versioned repo) → immediate impact
    return True, 'immediate'


def is_rst_file(filename: str) -> bool:
    """Check if a file is an RST file."""
    return filename.endswith(('.rst', '.txt'))


def get_all_documentation_files(content_dir: Path) -> List[Path]:
    """
    Get all documentation files from the content directory.

    Args:
        content_dir: Path to content directory

    Returns:
        List of all .rst and .txt files
    """
    files = []

    # Search patterns for documentation files
    search_patterns = ["*.rst", "*.txt", "*.yaml", "*.yml"]

    # Get all repositories in content directory
    for repo_dir in content_dir.iterdir():
        if not repo_dir.is_dir() or repo_dir.name.startswith('.'):
            continue

        # Check if this looks like a versioned repository
        has_versions = any(
            (repo_dir / version).is_dir() and (repo_dir / version / "source").exists()
            for version in ["current", "upcoming", "master", "main"]
            if (repo_dir / version).exists()
        )

        if has_versions:
            # Versioned repository - get files from all versions
            repo_files = get_versioned_repository_files(repo_dir, search_patterns)
            files.extend(repo_files)
        else:
            # Non-versioned repository - search directly
            for pattern in search_patterns:
                repo_files = list(repo_dir.rglob(pattern))
                files.extend(repo_files)

    return files


def get_versioned_repository_files(repo_dir: Path, search_patterns: List[str]) -> List[Path]:
    """
    Get files from a versioned repository, searching ALL versions.

    This searches all versions because:
    - We only detect changes in current/ (what matters for new removals)
    - But we search all versions for references (since old versions still get built)

    Args:
        repo_dir: Path to versioned repository
        search_patterns: File patterns to search for

    Returns:
        List of files from ALL versions
    """
    files = []

    # Get all version directories
    version_dirs = []
    for item in repo_dir.iterdir():
        if item.is_dir() and (item / "source").exists():
            version_dirs.append(item)

    # If we found version directories, search all of them
    if version_dirs:
        for version_dir in version_dirs:
            for pattern in search_patterns:
                version_files = list(version_dir.rglob(pattern))
                files.extend(version_files)
        print(f"📁 Found {len(files)} files across {len(version_dirs)} versions in {repo_dir.name}")
    else:
        # Non-versioned repository - search the root
        if (repo_dir / "source").exists():
            for pattern in search_patterns:
                repo_files = list(repo_dir.rglob(pattern))
                files.extend(repo_files)
            print(f"📁 Found {len(files)} files in non-versioned repo: {repo_dir.name}")
        else:
            print(f"⚠️  No version directories or source/ found in {repo_dir.name}, skipping")

    return files


def search_corpus_for_references(anchors: Set[str], content_dir: Path) -> Dict[str, List[Path]]:
    """
    Search the documentation corpus for references to the given anchors.

    Args:
        anchors: Set of anchor names to search for
        content_dir: Path to content directory

    Returns:
        Dict mapping anchor names to lists of files that reference them
    """
    if not anchors:
        return {}

    print(f"🔍 Searching for references to {len(anchors)} anchor(s)...")

    # Get all documentation files
    all_files = get_all_documentation_files(content_dir)
    print(f"🔍 Searching {len(all_files)} files across all versions for references...")

    # Build regex patterns for each anchor
    anchor_patterns = {}
    for anchor in anchors:
        # Pattern to match :ref:`anchor` or :ref:`text <anchor>`
        # Handle multi-line refs and various formats
        pattern = re.compile(
            r':ref:`(?:[^`<]*<\s*' + re.escape(anchor) + r'\s*>|' + re.escape(anchor) + r'`)',
            re.MULTILINE | re.DOTALL
        )
        anchor_patterns[anchor] = pattern

    # Search for references
    references = {anchor: [] for anchor in anchors}

    for file_path in all_files:
        try:
            content = file_path.read_text(encoding='utf-8')

            for anchor, pattern in anchor_patterns.items():
                if pattern.search(content):
                    references[anchor].append(file_path)

        except Exception:
            # Skip files that can't be read
            continue

    return references


def generate_enhanced_impact_report(
    immediate_removed: Set[str],
    future_removed: Set[str],
    immediate_references: Dict[str, List[Path]],
    future_references: Dict[str, List[Path]],
    repo_root: Path
) -> str:
    """
    Generate a comprehensive impact report distinguishing immediate vs future impacts.

    Args:
        immediate_removed: Anchors removed from current/ (immediate impact)
        future_removed: Anchors removed from upcoming/ (future impact)
        immediate_references: References to immediate impact anchors
        future_references: References to future impact anchors
        repo_root: Repository root path

    Returns:
        Formatted report string
    """
    report_lines = [
        "🔍 Cross-Reference Impact Analysis",
        "=" * 40,
        ""
    ]

    total_immediate_files = 0
    total_future_files = 0

    # Report immediate impacts
    if immediate_removed:
        report_lines.extend([
            "🚨 IMMEDIATE IMPACT (affects production now)",
            f"Analyzed {len(immediate_removed)} anchor(s) removed from current/published versions:",
            ""
        ])

        for anchor in sorted(immediate_removed):
            affected_files = immediate_references.get(anchor, [])
            report_lines.append(f"📍 Anchor: '{anchor}' (IMMEDIATE)")

            if not affected_files:
                report_lines.append("   ✅ No cross-references found")
            else:
                total_immediate_files += len(affected_files)
                report_lines.append(f"   🚨 Found {len(affected_files)} file(s) with references:")
                for file_path in sorted(affected_files):
                    try:
                        relative_path = file_path.relative_to(repo_root)
                        report_lines.append(f"      - {relative_path}")
                    except ValueError:
                        report_lines.append(f"      - {file_path}")

            report_lines.append("")

    # Report future impacts
    if future_removed:
        report_lines.extend([
            "⏳ FUTURE IMPACT (affects production when upcoming → current)",
            f"Analyzed {len(future_removed)} anchor(s) removed from upcoming/ versions:",
            ""
        ])

        for anchor in sorted(future_removed):
            affected_files = future_references.get(anchor, [])
            report_lines.append(f"📍 Anchor: '{anchor}' (FUTURE)")

            if not affected_files:
                report_lines.append("   ✅ No cross-references found")
            else:
                total_future_files += len(affected_files)
                report_lines.append(f"   ⏳ Found {len(affected_files)} file(s) with references:")
                for file_path in sorted(affected_files):
                    try:
                        relative_path = file_path.relative_to(repo_root)
                        report_lines.append(f"      - {relative_path}")
                    except ValueError:
                        report_lines.append(f"      - {file_path}")

            report_lines.append("")

    # Summary
    report_lines.append("=" * 40)
    report_lines.append("📊 SUMMARY")
    report_lines.append("=" * 40)

    if total_immediate_files == 0 and total_future_files == 0:
        report_lines.extend([
            "🎉 No cross-references found!",
            "   All removed anchors are safe to remove."
        ])
    else:
        if total_immediate_files > 0:
            report_lines.append(f"🚨 IMMEDIATE: {total_immediate_files} file(s) will break on merge")
        if total_future_files > 0:
            report_lines.append(f"⏳ FUTURE: {total_future_files} file(s) will break when upcoming → current")

        report_lines.extend([
            "",
            "💡 RECOMMENDATIONS:",
            "   • Review immediate impacts before merging",
            "   • Plan for future impacts during version promotion",
            "   • Consider updating affected files or adding redirects"
        ])

        anchors_with_broken_refs = (
            sum(1 for files in immediate_references.values() if files) +
            sum(1 for files in future_references.values() if files)
        )
        total_refs = total_immediate_files + total_future_files
        report_lines.extend([
            "",
            f"{anchors_with_broken_refs} removed anchor(s) with {total_refs} broken reference(s) found. See above for affected files."
        ])

    return "\n".join(report_lines)


class LocalGitDetector:
    """Detector that works with local git repository."""
    
    def __init__(self, repo_root: Path):
        """Initialize with repository root."""
        self.repo_root = repo_root
        self.content_dir = repo_root / "content"
        
        # Verify this is a git repository
        if not (repo_root / ".git").exists():
            raise ValueError(f"Not a git repository: {repo_root}")
    
    def get_git_diff(self, base: str = "main", head: str = "HEAD", working_dir: bool = False) -> str:
        """
        Get git diff between two references.
        
        Args:
            base: Base reference (default: main)
            head: Head reference (default: HEAD)
            working_dir: If True, compare working directory with HEAD
            
        Returns:
            Git diff output as string
        """
        try:
            if working_dir:
                # Compare working directory with HEAD
                cmd = ["git", "diff", "HEAD"]
            else:
                # Compare two references
                cmd = ["git", "diff", f"{base}...{head}"]
            
            print(f"🔧 Running: {' '.join(cmd)}")
            
            result = subprocess.run(
                cmd,
                cwd=self.repo_root,
                capture_output=True,
                text=True,
                check=True
            )
            
            return result.stdout
            
        except subprocess.CalledProcessError as e:
            raise Exception(f"Git diff failed: {e.stderr}")
    
    def extract_removed_anchors_from_git_diff(self, diff_content: str) -> tuple[Set[str], Set[str], Dict[str, str]]:
        """
        Extract removed ref anchors from git diff output, categorized by impact type.

        Args:
            diff_content: Raw git diff output

        Returns:
            Tuple of (immediate_removed_anchors, future_removed_anchors, anchor_to_site_map)
        """
        immediate_removed = set()
        immediate_added = set()
        future_removed = set()
        future_added = set()

        # Track which site each anchor belongs to
        anchor_to_site = {}

        # Regex to match ref anchor definitions
        ref_anchor_pattern = re.compile(r'^\s*\.\.\s+_([^:\s]+):\s*$')

        # Track which files are being processed
        current_file = None
        current_impact_type = ''
        pending_old_file = None

        for line in diff_content.split('\n'):
            # Track file being processed
            if line.startswith('--- a/'):
                pending_old_file = line[6:]
                continue

            if line.startswith('+++ b/'):
                current_file = line[6:]  # Remove '+++ b/' prefix
                should_analyze, current_impact_type = should_analyze_file_for_changes(current_file)
                if not should_analyze:
                    current_impact_type = ''
                pending_old_file = None
                continue

            if line.startswith('+++ '):
                # +++ /dev/null — deleted file; use the --- a/ path captured above
                if pending_old_file:
                    current_file = pending_old_file
                    should_analyze, current_impact_type = should_analyze_file_for_changes(current_file)
                    if not should_analyze:
                        current_impact_type = ''
                pending_old_file = None
                continue

            # Only process files we care about for change detection
            if not current_impact_type:
                continue

            if line.startswith('-'):
                # Line was removed
                content = line[1:]  # Remove the '-' prefix
                match = ref_anchor_pattern.search(content)
                if match:
                    anchor_name = match.group(1).strip()
                    site_name = get_site_name_from_path(current_file)
                    anchor_to_site[anchor_name] = site_name

                    if current_impact_type == 'immediate':
                        immediate_removed.add(anchor_name)
                    elif current_impact_type == 'future':
                        future_removed.add(anchor_name)

            elif line.startswith('+'):
                # Line was added
                content = line[1:]  # Remove the '+' prefix
                match = ref_anchor_pattern.search(content)
                if match:
                    anchor_name = match.group(1).strip()
                    if current_impact_type == 'immediate':
                        immediate_added.add(anchor_name)
                    elif current_impact_type == 'future':
                        future_added.add(anchor_name)

        # Return only anchors that were removed but not re-added in each category
        immediate_truly_removed = immediate_removed - immediate_added
        future_truly_removed = future_removed - future_added

        if immediate_truly_removed:
            print(f"🔍 Found {len(immediate_truly_removed)} immediate impact anchor(s): {', '.join(sorted(immediate_truly_removed))}")
        if future_truly_removed:
            print(f"🔍 Found {len(future_truly_removed)} future impact anchor(s): {', '.join(sorted(future_truly_removed))}")
        if not immediate_truly_removed and not future_truly_removed:
            print("✅ No ref anchors were removed")

        return immediate_truly_removed, future_truly_removed, anchor_to_site
    
    def _is_rst_file(self, filename: str) -> bool:
        """Check if a filename represents an RST file."""
        return filename.endswith(('.rst', '.txt'))
    
    def analyze_local_changes(self, base: str = "main", head: str = "HEAD", working_dir: bool = False) -> str:
        """
        Analyze local git changes for ref anchor impacts.
        
        Args:
            base: Base reference to compare against
            head: Head reference to compare
            working_dir: If True, analyze working directory changes
            
        Returns:
            Analysis report string
        """
        try:
            if working_dir:
                print(f"🚀 Analyzing working directory changes against HEAD...")
            else:
                print(f"🚀 Analyzing changes from {base} to {head}...")
            
            # Get git diff
            diff_content = self.get_git_diff(base, head, working_dir)
            
            if not diff_content.strip():
                return "✅ No changes found in the specified range."
            
            # Extract removed anchors, categorized by impact type
            immediate_removed, future_removed, anchor_to_site = self.extract_removed_anchors_from_git_diff(diff_content)

            if not immediate_removed and not future_removed:
                return "✅ No ref anchors were removed in the specified changes."

            # Search for references in the documentation corpus
            print(f"\n🔍 Searching documentation corpus for references...")

            immediate_references = {}
            future_references = {}

            if immediate_removed:
                immediate_references = search_corpus_for_references(immediate_removed, self.content_dir)
            if future_removed:
                future_references = search_corpus_for_references(future_removed, self.content_dir)

            # Build intersphinx dependency graph for cross-site validation
            dependency_graph = build_intersphinx_dependency_graph(self.content_dir)

            # Filter references based on intersphinx dependencies
            immediate_filtered = filter_references_by_intersphinx(
                immediate_references, anchor_to_site, dependency_graph, self.repo_root
            )
            future_filtered = filter_references_by_intersphinx(
                future_references, anchor_to_site, dependency_graph, self.repo_root
            )

            # Generate enhanced report
            return generate_enhanced_impact_report(
                immediate_removed, future_removed,
                immediate_filtered, future_filtered,
                self.repo_root
            )
            
        except Exception as e:
            return f"❌ Error analyzing local changes: {str(e)}"


def get_current_branch() -> str:
    """Get the current git branch name."""
    try:
        result = subprocess.run(
            ["git", "branch", "--show-current"],
            capture_output=True,
            text=True,
            check=True
        )
        return result.stdout.strip()
    except subprocess.CalledProcessError:
        return "HEAD"


def main():
    """Main entry point for local git analysis."""
    parser = argparse.ArgumentParser(
        description="Analyze local git changes for ref anchor cross-reference impacts",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s                           # Compare current branch with main
  %(prog)s --branch feature-branch   # Compare specific branch with main
  %(prog)s --base main --head dev     # Compare two specific references
  %(prog)s --working-dir              # Compare working directory with HEAD
  %(prog)s --base HEAD~3              # Compare last 3 commits
        """
    )
    
    parser.add_argument(
        "--base",
        default="main",
        help="Base reference to compare against (default: main)"
    )
    
    parser.add_argument(
        "--head", 
        help="Head reference to compare (default: current branch or HEAD)"
    )
    
    parser.add_argument(
        "--branch",
        help="Compare specific branch with main (shortcut for --base main --head BRANCH)"
    )
    
    parser.add_argument(
        "--working-dir",
        action="store_true",
        help="Compare working directory changes with HEAD"
    )
    
    parser.add_argument(
        "--repo-root",
        type=Path,
        default=Path.cwd(),
        help="Path to git repository root (default: current directory)"
    )
    
    args = parser.parse_args()
    
    # Determine comparison parameters
    if args.branch:
        base = "main"
        head = args.branch
        working_dir = False
    elif args.working_dir:
        base = "main"  # Not used for working dir comparison
        head = "HEAD"  # Not used for working dir comparison  
        working_dir = True
    else:
        base = args.base
        head = args.head or get_current_branch() or "HEAD"
        working_dir = False
    
    # Find repository root
    repo_root = args.repo_root
    while repo_root != repo_root.parent:
        if (repo_root / ".git").exists():
            break
        repo_root = repo_root.parent
    else:
        print("❌ Error: Not in a git repository")
        sys.exit(1)
    
    # Validate content directory exists
    content_dir = repo_root / "content"
    if not content_dir.exists():
        print(f"❌ Error: Content directory not found: {content_dir}")
        print("   Make sure you're in the docs-mongodb-internal repository")
        sys.exit(1)
    
    try:
        # Initialize detector and analyze
        detector = LocalGitDetector(repo_root)
        report = detector.analyze_local_changes(base, head, working_dir)
        
        # Output report
        print("\n" + "=" * 60)
        print("📊 LOCAL GIT ANALYSIS REPORT")
        print("=" * 60)
        print(report)
        
        # Provide next steps
        if "will break" in report:
            print("\n" + "=" * 60)
            print("💡 NEXT STEPS")
            print("=" * 60)
            print("⚠️  Cross-references found! Consider:")
            print("   1. Update affected files to use different anchors")
            print("   2. Add redirects or aliases for removed anchors")
            print("   3. Coordinate with documentation teams")
            print("   4. Test the changes before merging")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
