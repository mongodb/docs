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
        print("✅ Committing removal of excluded files")
        run_git_command(["add", "-A"], cwd=repo_path)  # Stage all changes including deletions
        
        # Configure Git user for the commit
        run_git_command(["config", "user.name", "Repo Sync Bot"], cwd=repo_path, verbose=False)
        run_git_command(["config", "user.email", "repo-sync@mongodb.com"], cwd=repo_path, verbose=False)
        
        run_git_command(["commit", "-m", "Remove excluded files from sync"], cwd=repo_path)

    else:
        print("ℹ️  No changes to commit after file removal")

    # Stage deletions (if any)
    run_git_command(["add", "-u"], cwd=repo_path)

    # Commit if there are staged changes
    status = run_git_command(["status", "--porcelain"], cwd=repo_path, verbose=False)
    if status.stdout.strip():
        print("Committing deletions of excluded files")
        run_git_command(["commit", "-m", "Remove excluded files from sync"], cwd=repo_path)
    else:
        print("No changes to commit after sparse checkout")

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

    print(f"\n🧹 Removing excluded files")
    remove_excluded_files(temp_dir, EXCLUDE_PATTERNS)

    print(f"\n🔗 Adding public-facing remote: {dest_repo_url}")
    run_git_command(["remote", "add", "public-facing", dest_repo_url], cwd=temp_dir)

    print(f"📤 Pushing to destination repo on branch '{branch}'")
    run_git_command(["push", "--force-with-lease", "public-facing", branch], cwd=temp_dir)

    print(f"🧼 Cleaning up")
    shutil.rmtree(temp_dir)
    print("✅ Done.")

if __name__ == "__main__":
    typer.run(main)
