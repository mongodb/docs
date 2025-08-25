exports = async function greetNewContributors(request, response) {
  // Parse the webhook event from the incoming request.
  const event = JSON.parse(request.body.text());

  // Don't do anything unless this is a new issue or pull request
  if (event.action !== "opened") {
    return response.setStatusCode(200);
  }

  // Get data from the GitHub webhook event.
  // Based on the webhook configuration the event will be one of the following:
  // - issues: https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#issues
  // - pull_request: https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#pull_request
  const sender = event.sender;
  const repo = event.repository;
  const contribution = event.issue || event.pull_request;
  const contribution_url = event.issue
    ? event.issue.url
    : event.pull_request.issue_url;
  const issue_number = contribution.number;

  // Record this contribution in the user's contributor document.
  // If this user hasn't contributed to the repo before, create a document for them.
  const atlas = context.services.get("mongodb-atlas");
  const contributors = atlas.db("community").collection("contributors");
  const contributor = await contributors.findOneAndUpdate(
    // Look up the user by their GitHub login
    { login: sender.login },
    // Add this issue or pull request to their list of contributions
    {
      $push: {
        contributions: {
          date: new Date(),
          type: event.issue ? "issue" : "pull_request",
          url: contribution_url,
        },
      },
    },
    // If they haven't contributed before, add them to the database
    { upsert: true, returnNewDocument: true }
  );

  // Send a welcome message to first time contributors on their issue or pull request
  const isFirstTimeContributor = contributor.contributions.length === 1;
  if (isFirstTimeContributor) {
    const octokit = require("@octokit/request");
    await octokit.request(
      "POST /repos/{owner}/{repo}/issues/{issue_number}/comments",
      {
        headers: {
          authorization: `token ${context.values.get("GitHubAccessToken")}`,
        },
        owner: repo.owner.login,
        repo: repo.name,
        issue_number: issue_number,
        body: `Hi there ${sender.login} 👋 Thanks for your first contribution!`,
      }
    );
  }

  // Configure the HTTP response sent back to GitHub
  return response
    .setStatusCode(200)
    .setHeader("Content-Type", "application/json")
    .setBody(
      isFirstTimeContributor
        ? `This is ${sender.login}'s first contribution!`
        : `${sender.login} has contributed before.`
    );
};
