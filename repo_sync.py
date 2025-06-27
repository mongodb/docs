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


def configure_sparse_checkout(repo_path: Path, exclude: List[str]):
    print(f"\n🔧 Configuring sparse checkout in: {repo_path}")
    run_git_command(["sparse-checkout", "init", "--no-cone"], cwd=repo_path)

    sparse_file = repo_path / ".git/info/sparse-checkout"
    lines = ["/*"]  # include everything
    for pattern in exclude:
        lines.append(f"!/{pattern}")  # explicitly exclude files

    sparse_file.write_text("\n".join(lines) + "\n")
    print(f"📄 Sparse checkout file:\n{''.join(lines)}")

    # Apply sparse rules and remove excluded files
    run_git_command(["read-tree", "-mu", "HEAD"], cwd=repo_path)

    # Confirm excluded files are gone
    for pattern in exclude:
        path = repo_path / pattern
        if path.exists():
            print(f"⚠️  WARNING: {pattern} still exists after sparse checkout")
        else:
            print(f"✅ Removed: {pattern}")

    # Stage deletions
    run_git_command(["add", "-u"], cwd=repo_path)

    # Commit if needed
    status = run_git_command(["status", "--porcelain"], cwd=repo_path, verbose=False)
    if status.stdout.strip():
        print("✅ Committing deletions of excluded files")
        run_git_command(["commit", "-m", "Remove excluded files from sync"], cwd=repo_path)
    else:
        print("ℹ️  No changes to commit after sparse checkout")


def main(
    branch: Annotated[str, typer.Option(envvar="GITHUB_REF_NAME")],
    app_id: Annotated[int, typer.Option(envvar="APP_ID")],
    installation_id: Annotated[int, typer.Option(envvar="INSTALLATION_ID")],
    server_docs_private_key: Annotated[str, typer.Option(envvar="SERVER_DOCS_PRIVATE_KEY")],
):
    print(f"🚀 Starting repo sync to branch: {branch}")
    print(f"❌ Files to exclude: {EXCLUDE_PATTERNS}")

    access_token = get_installation_access_token(app_id, server_docs_private_key, installation_id)

    dest_repo_url = f"https://x-access-token:{access_token}@github.com/mongodb/docs.git"

    temp_dir = Path("temp_sync")
    if temp_dir.exists():
        shutil.rmtree(temp_dir)
    temp_dir.mkdir()

    print(f"📥 Cloning source repo into temp directory")
    run_git_command(["clone", "--no-checkout", f"https://x-access-token:{access_token}@github.com/10gen/docs-mongodb-internal.git", str(temp_dir)])

    print(f"\n🧹 Applying sparse-checkout to filter excluded files")
    configure_sparse_checkout(temp_dir, EXCLUDE_PATTERNS)

    print(f"\n🔗 Setting destination remote to {dest_repo_url}")
    run_git_command(["remote", "set-url", "origin", dest_repo_url], cwd=temp_dir)

    print(f"📤 Pushing to destination repo on branch '{branch}'")
    run_git_command(["push", "origin", branch], cwd=temp_dir)

    print(f"🧼 Cleaning up")
    shutil.rmtree(temp_dir)
    print("✅ Done.")


if __name__ == "__main__":
    typer.run(main)