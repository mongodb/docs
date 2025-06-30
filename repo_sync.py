import subprocess
from typing_extensions import Annotated
import typer
import github
from pathlib import Path
from typing import List
import shutil

# Define exclude patterns here
EXCLUDE_PATTERNS = [
    "platform/README.md",
    "platform/test.txt",
]

def get_installation_access_token(app_id: int, private_key: str, installation_id: int) -> str:
    integration = github.GithubIntegration(app_id, private_key)
    auth = integration.get_access_token(installation_id)
    assert auth and auth.token
    return auth.token

def run_git_command(args: List[str], cwd: Path = None, verbose: bool = True):
    result = subprocess.run(["git"] + args, capture_output=True, text=True, check=True, cwd=cwd)
    if verbose:
        print(f"Git command: git {' '.join(args)}")
        if result.stdout.strip():
            print(result.stdout.strip())
        if result.stderr.strip():
            print(result.stderr.strip())
    return result

def revert_problematic_commit(repo_path: Path):
    """Revert the specific problematic commit if it exists"""
    print(f"\n🔍 Checking for problematic commit...")
    
    # Check if the commit exists
    try:
        run_git_command(["show", "1b7475667a47fc3add99a9e1c78d9e6c848807ee"], cwd=repo_path, verbose=False)
        print(f"⚠️  Found problematic commit, reverting it...")
        
        # Configure Git user for the revert
        run_git_command(["config", "user.name", "Repo Sync Bot"], cwd=repo_path, verbose=False)
        run_git_command(["config", "user.email", "repo-sync@mongodb.com"], cwd=repo_path, verbose=False)
        
        # Revert the commit
        run_git_command(["revert", "--no-edit", "1b7475667a47fc3add99a9e1c78d9e6c848807ee"], cwd=repo_path)
        print(f"✅ Reverted problematic commit")
        return True
    except subprocess.CalledProcessError:
        print(f"ℹ️  Problematic commit not found, continuing...")
        return False

def remove_excluded_files(repo_path: Path, exclude: List[str]):
    print(f"\n🔧 Removing excluded files from: {repo_path}")
    
    # Check if excluded files exist and remove them
    files_to_remove = []
    for pattern in exclude:
        path = repo_path / pattern
        if path.exists():
            files_to_remove.append(pattern)
            print(f"📁 Found file to exclude: {pattern}")
    
    if not files_to_remove:
        print("ℹ️  No excluded files found - nothing to remove")
        return
    
    # Manually remove the files
    for pattern in files_to_remove:
        path = repo_path / pattern
        path.unlink()  # Remove the file
        print(f"🗑️  Removed: {pattern}")
    
    # Check Git status to see if changes are detected
    print(f"\n🔍 Checking Git status after file removal:")
    status_debug = run_git_command(["status", "--porcelain"], cwd=repo_path, verbose=False)
    if status_debug.stdout.strip():
        print(f"Changes detected: {status_debug.stdout.strip()}")
    else:
        print("No changes detected")

    # Commit the changes if any
    status = run_git_command(["status", "--porcelain"], cwd=repo_path, verbose=False)
    if status.stdout.strip():
        print("✅ Staging removal of excluded files")
        run_git_command(["add", "-A"], cwd=repo_path)  # Stage all changes including deletions
        
        # Configure Git user for the commit
        run_git_command(["config", "user.name", "Repo Sync Bot"], cwd=repo_path, verbose=False)
        run_git_command(["config", "user.email", "repo-sync@mongodb.com"], cwd=repo_path, verbose=False)
        
        # Don't commit - just stage the changes
        print("📝 Changes staged but not committed")
    else:
        print("ℹ️  No changes to stage after file removal")

def main(
    branch: Annotated[str, typer.Option(envvar="GITHUB_REF_NAME")],
    app_id: Annotated[int, typer.Option(envvar="APP_ID")],
    installation_id: Annotated[int, typer.Option(envvar="INSTALLATION_ID")],
    server_docs_private_key: Annotated[str, typer.Option(envvar="SERVER_DOCS_PRIVATE_KEY")],
    internal_access_token: Annotated[str, typer.Option(envvar="GH_ACCESS_TOKEN")],
):
    print(f"🚀 Starting repo sync to branch: {branch}")
    print(f"❌ Files to exclude: {EXCLUDE_PATTERNS}")

    print(f"🔑 Internal access token: {internal_access_token}")

    access_token = get_installation_access_token(app_id, server_docs_private_key, installation_id)

    dest_repo_url = f"https://x-access-token:{access_token}@github.com/mongodb/docs.git"

    temp_dir = Path("temp_sync")
    if temp_dir.exists():
        shutil.rmtree(temp_dir)
    temp_dir.mkdir()

    print(f"📥 Cloning source repo into temp directory")
    run_git_command([
        "clone",
        f"https://x-access-token:{internal_access_token}@github.com/10gen/docs-mongodb-internal.git",
        str(temp_dir)
    ])

    # Check for and revert the problematic commit if it exists
    revert_problematic_commit(temp_dir)

    print(f"\n🧹 Removing excluded files")
    remove_excluded_files(temp_dir, EXCLUDE_PATTERNS)

    print(f"\n🔗 Adding public-facing remote: {dest_repo_url}")
    run_git_command(["remote", "add", "public-facing", dest_repo_url], cwd=temp_dir)

    # Push the working directory state directly without committing
    print(f"📤 Pushing working directory state to destination repo on branch '{branch}'")
    
    # Push directly to main with force-with-lease (safer than force)
    run_git_command(["push", "--force-with-lease", "public-facing", branch], cwd=temp_dir)

    print(f"🧼 Cleaning up")
    shutil.rmtree(temp_dir)
    print("✅ Done.")

if __name__ == "__main__":
    typer.run(main)