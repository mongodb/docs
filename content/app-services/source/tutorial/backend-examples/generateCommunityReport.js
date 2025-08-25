exports = async function generateCommunityReport({ owner, repo, startDate }) {
  // Look up issues and pull requests that had activity
  const octokit = require("@octokit/request");
  const { data: issuesWithActivity } = await octokit.request(
    "GET /repos/{owner}/{repo}/issues",
    {
      headers: {
        authorization: `token ${context.values.get("GitHubAccessToken")}`,
      },
      owner: owner,
      repo: repo,
      since: startDate,
    }
  );

  // Look up users that contributed to the repo
  const atlas = context.services.get("mongodb-atlas");
  const contributors = atlas.db("community").collection("contributors");
  const allContributors = await contributors
    .find({
      contributions: {
        $elemMatch: {
          date: { $gt: new Date(startDate) },
          owner: owner,
          repo: repo,
        },
      },
    })
    .toArray();

  // Keep track of users who made their first contribution
  const newContributors = allContributors.filter((c) => {
    new Date(c.contributions[0].date) > new Date(startDate);
  });

  // Return a report with the data
  return {
    owner,
    repo,
    startDate,
    issuesWithActivity,
    allContributors,
    newContributors,
  };
};
