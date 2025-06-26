import subprocess
from typing_extensions import Annotated
import typer
import github
from pathlib import Path
from typing import List

# Define exclude patterns here
EXCLUDE_PATTERNS = [
    "docs/platform/README.md",
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
    subprocess.run(["git"] + args, check=True, cwd=cwd)


def configure_sparse_checkout(repo_path: Path, exclude: List[str]):
    """Configure sparse checkout to exclude specified patterns."""
    run_git_command(["sparse-checkout", "init", "--no-cone"], cwd=repo_path)

    sparse_file = repo_path / ".git/info/sparse-checkout"
    lines = ["/*"]  # include everything first
    for pattern in exclude:
        lines.append(f"!{pattern}")  # exclude specific files or dirs

    sparse_file.write_text("\n".join(lines) + "\n")

    # Re-checkout to apply sparse rules
    run_git_command(["checkout"], cwd=repo_path)


def main(
    branch: Annotated[str, typer.Option(envvar="GITHUB_REF_NAME")],
    app_id: Annotated[int, typer.Option(envvar="APP_ID")],
    installation_id: Annotated[int, typer.Option(envvar="INSTALLATION_ID")],
    server_docs_private_key: Annotated[str, typer.Option(envvar="SERVER_DOCS_PRIVATE_KEY")],
):
    access_token = get_installation_access_token(app_id, server_docs_private_key, installation_id)

    repo_url = f"https://x-access-token:{access_token}@github.com/mongodb/docs.git"
    local_repo_path = Path("cloned_docs")

    # Clone without checking out to set up sparse checkout
    run_git_command(["clone", "--no-checkout", repo_url, str(local_repo_path)])

    # Configure sparse checkout with predefined exclude patterns
    configure_sparse_checkout(local_repo_path, EXCLUDE_PATTERNS)

    # Checkout the desired branch
    run_git_command(["checkout", branch], cwd=local_repo_path)

    # Push to the destination repository
    run_git_command(["push", repo_url, branch], cwd=local_repo_path)


if __name__ == "__main__":
    typer.run(main)
