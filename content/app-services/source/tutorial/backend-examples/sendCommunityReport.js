exports = async function sendCommunityReport(changeEvent) {
  // Pull out the report document from the database change event
  const report = changeEvent.fullDocument;
  
  // Format values from the report to include in the message
  const projectName = `${report.owner}/${report.repo}`;
  const moment = require("moment");
  const formattedDate = moment(report.startDate).utc().format("MMMM Do, YYYY");
  const numIssuesWithActivity = report.issuesWithActivity.length;
  const numContributors = report.allContributors.length;
  const numNewContributors = report.newContributors.length;
  
  // Create a message string that describes the data in the report
  const message = [
    `# Community contributions to ${projectName} since ${formattedDate}`,
    `Last week, there was activity on ${numIssuesWithActivity} issues and pull requests.`,
    `We had ${numContributors} people contribute, including ${numNewContributors} first time contributors.`,
  ].join("\n");
  
  // For this tutorial we'll just log the message, but you could use a
  // service to send it as an email or push notification instead.
  console.log(message);
};
