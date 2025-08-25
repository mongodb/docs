exports = async function generateAndSaveCommunityReports() {
  const projects = context.values.get("GitHubProjects");
  const lastMonday = getLastMonday(); // e.g. "2022-02-21T05:00:00.000Z"

  // Generate a report for every tracked repo
  const reportsForLastWeek = await Promise.all(
    // Call the `generateCommunityReport` function for each project
    projects.map(async (project) => {
      return context.functions.execute("generateCommunityReport", {
        owner: project.owner,
        repo: project.repo,
        startDate: lastMonday,
      });
    })
  );

  // Save the generated reports in Atlas
  const atlas = context.services.get("mongodb-atlas");
  const reports = atlas.db("community").collection("reports");
  return await reports.insertMany(reportsForLastWeek);
};

// Get an ISO string for last Monday at 5AM UTC
function getLastMonday() {
  const moment = require("moment");
  return moment(new Date().setUTCHours(5, 0, 0, 0))
    .utc()
    .day(1 - 7)
    .toISOString();
}
