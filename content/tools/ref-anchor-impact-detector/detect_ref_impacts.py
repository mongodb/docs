#!/usr/bin/env python3
"""
Ref anchor impact detector for MongoDB documentation.

This script analyzes git changes for removed ref anchors and their cross-reference impacts.

Usage:
    python detect_ref_impacts.py [options]

Examples:
    python detect_ref_impacts.py                    # Analyze working directory changes (default)
    python detect_ref_impacts.py --ci               # Compare HEAD to main (for CI/CD)
"""

import argparse
import sys
from pathlib import Path


def analyze_with_local_git(base: str = "main", head: str = "HEAD", working_dir: bool = True) -> bool:
    """
    Analyze using local git.
    
    Args:
        base: Base commit/branch for comparison
        head: Head commit/branch for comparison
        working_dir: Compare working directory with HEAD
        
    Returns:
        True if analysis was successful
    """
    try:
        from local_git_detector import LocalGitDetector
        
        # Find repository root
        repo_root = Path.cwd()
        while repo_root != repo_root.parent:
            if (repo_root / ".git").exists():
                break
            repo_root = repo_root.parent
        else:
            print("❌ Error: Not in a git repository")
            return False
        
        # Create detector and analyze
        detector = LocalGitDetector(repo_root)
        result = detector.analyze_local_changes(
            base=base,
            head=head,
            working_dir=working_dir
        )
        
        print("\n" + "=" * 60)
        print("📊 REF ANCHOR IMPACT ANALYSIS")
        print("=" * 60)
        print(result)
        
        return "will break" not in result
        
    except Exception as e:
        print(f"❌ Error analyzing local git: {e}")
        return False


def main():
    """Main entry point."""
    parser = argparse.ArgumentParser(
        description="Ref anchor impact detector for MongoDB documentation",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s                    # Analyze working directory changes (default)
  %(prog)s --ci               # Compare HEAD to main (for CI/CD)
"""
    )
    
    parser.add_argument(
        "--ci",
        action="store_true",
        help="Compare HEAD to base branch (for CI/CD pipelines)"
    )

    parser.add_argument(
        "--base",
        default="main",
        help="Base branch or ref to compare against (default: main)"
    )

    args = parser.parse_args()
    
    # Local git analysis
    if args.ci:
        print(f"🔍 Analyzing HEAD changes against {args.base} (CI/CD mode)...")
        success = analyze_with_local_git(
            base=args.base,
            head="HEAD",
            working_dir=False
        )
    else:
        print("🔍 Analyzing working directory changes...")
        success = analyze_with_local_git(
            working_dir=True
        )
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
