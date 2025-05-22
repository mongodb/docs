import subprocess
from typing_extensions import Annotated
import typer
import github

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
    assert auth
    assert auth.token
    return auth.token


def main(branch: Annotated[str, typer.Option(envvar="GITHUB_REF_NAME")],
         app_id: Annotated[int, typer.Option(envvar="APP_ID")],
         installation_id: Annotated[int, typer.Option(envvar="INSTALLATION_ID")],
         server_docs_private_key: Annotated[str, typer.Option(envvar="SERVER_DOCS_PRIVATE_KEY")]):

    access_token = get_installation_access_token(app_id, server_docs_private_key, installation_id)

    git_destination_url_with_token = f"https://x-access-token:{access_token}@github.com/mongodb/docs.git"
    # Use a local path for testing
    # git_destination_url_with_token = "path_to_local_git"

    # Taken from SO: https://stackoverflow.com/a/69979203
    subprocess.run(["git", "config", "--unset-all", "http.https://github.com/.extraheader"], check=True)
    # Push the code upstream
    subprocess.run(["git", "push", git_destination_url_with_token, branch], check=True)


if __name__ == "__main__":
    typer.run(main)
