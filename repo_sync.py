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
]

def get_installation_access_token(app_id: int, private_key: str,
                                  installation_id: int) -> str:
    """
    Obtain an installation access token using JWT.

    Args:
    - app_id (int): The application ID for GitHub App.
    - private_key (str): The private key associated with the GitHub App.
    - installation_id (int): The installation ID of the GitHub App for a particular account.

    Returns
    - Optional[str]: The installation access token. Returns `None` if there's an error obtaining the token.

    """
    integration = github.GithubIntegration(app_id, private_key)
    auth = integration.get_access_token(installation_id)
    assert auth and auth.token
    return auth.token


def run_git_command(args: List[str], cwd: Path = None):
    result = subprocess.run(["git"] + args, capture_output=True, text=True, check=True, cwd=cwd)
    print(f"Git command: git {' '.join(args)}")
    if result.stdout.strip():
        print(f"Output: {result.stdout.strip()}")
    return result


def configure_sparse_checkout(repo_path: Path, exclude: List[str]):
    """Configure sparse checkout to exclude specified patterns."""
    print(f"Configuring sparse checkout in {repo_path}")
    print(f"Exclude patterns: {exclude}")
    
    run_git_command(["sparse-checkout", "init", "--no-cone"], cwd=repo_path)

    sparse_file = repo_path / ".git/info/sparse-checkout"
    lines = ["/*"]  # include everything first
    for pattern in exclude:
        lines.append(f"!{pattern}")  # exclude specific files or dirs

    sparse_content = "\n".join(lines) + "\n"
    print(f"Sparse checkout content:\n{sparse_content}")
    sparse_file.write_text(sparse_content)

    # Re-checkout to apply sparse rules
    run_git_command(["checkout"], cwd=repo_path)
    
    # Show what files are actually present
    files = list(repo_path.rglob("*"))
    print(f"Files in repository after sparse checkout:")
    for file in files:
        if file.is_file():
            print(f"  {file.relative_to(repo_path)}")


def main(
    branch: Annotated[str, typer.Option(envvar="GITHUB_REF_NAME")],
    app_id: Annotated[int, typer.Option(envvar="APP_ID")],
    installation_id: Annotated[int, typer.Option(envvar="INSTALLATION_ID")],
    server_docs_private_key: Annotated[str, typer.Option(envvar="SERVER_DOCS_PRIVATE_KEY")],
):
    print(f"Starting repo sync to branch: {branch}")
    print(f"Exclude patterns: {EXCLUDE_PATTERNS}")
    
    access_token = get_installation_access_token(app_id, server_docs_private_key, installation_id)

    # Destination repository URL (production)
    dest_repo_url = f"https://x-access-token:{access_token}@github.com/mongodb/docs.git"
    
    # Create a temporary working directory
    temp_dir = Path("temp_sync")
    if temp_dir.exists():
        shutil.rmtree(temp_dir)
    temp_dir.mkdir()
    
    # Use git to create a clean copy (handles symlinks properly)
    print(f"Creating clean copy using git")
    run_git_command(["clone", "--no-checkout", ".", str(temp_dir)])
    
    # Configure sparse checkout with predefined exclude patterns
    configure_sparse_checkout(temp_dir, EXCLUDE_PATTERNS)

    # Add the destination remote
    print(f"Adding destination remote: {dest_repo_url}")
    run_git_command(["remote", "add", "origin", dest_repo_url], cwd=temp_dir)

    # Check git status before pushing
    print("Git status before push:")
    run_git_command(["status"], cwd=temp_dir)

    # Push to the destination repository
    print("Pushing to destination repository")
    run_git_command(["push", "origin", branch], cwd=temp_dir)
    
    # Clean up
    print("Cleaning up temporary directory")
    shutil.rmtree(temp_dir)


if __name__ == "__main__":
    typer.run(main)
