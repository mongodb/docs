import subprocess
from typing_extensions import Annotated
import typer
import github
from pathlib import Path
from typing import List

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

    # Get the current repository URL and add authentication
    current_repo_url = subprocess.run(["git", "config", "--get", "remote.origin.url"], 
                                     capture_output=True, text=True, check=True).stdout.strip()
    
    # Add authentication to the source repo URL using the same access token
    if current_repo_url.startswith("https://github.com/"):
        current_repo_url = current_repo_url.replace("https://github.com/", f"https://x-access-token:{access_token}@github.com/")
    
    # Destination repository URL (test repo for easier testing)

    dest_repo_url = f"https://x-access-token:{access_token}@github.com/mongodb/docs.git"
    
    local_repo_path = Path("cloned_docs")

    # Clone the CURRENT repository (docs-mongodb-internal) without checking out
    print(f"Cloning current repo {current_repo_url} to {local_repo_path}")
    run_git_command(["clone", "--no-checkout", current_repo_url, str(local_repo_path)])

    # Configure sparse checkout with predefined exclude patterns
    configure_sparse_checkout(local_repo_path, EXCLUDE_PATTERNS)

    # Checkout the desired branch
    print(f"Checking out branch: {branch}")
    run_git_command(["checkout", branch], cwd=local_repo_path)

    # Change the remote to point to the destination repository
    print(f"Changing remote to destination: {dest_repo_url}")
    run_git_command(["remote", "set-url", "origin", dest_repo_url], cwd=local_repo_path)

    # Check git status before pushing
    print("Git status before push:")
    run_git_command(["status"], cwd=local_repo_path)

    # Push to the destination repository
    print("Pushing to destination repository")
    run_git_command(["push", "origin", branch], cwd=local_repo_path)

    # Check git status before pushing
    print("Git status before push:")
    run_git_command(["status"], cwd=local_repo_path)

    # Push to the destination repository
    print("Pushing to destination repository")
    run_git_command(["push", "origin", branch], cwd=local_repo_path)

if __name__ == "__main__":
    typer.run(main)
