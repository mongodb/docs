import JiraApi from 'jira-client';
import envConfig from './env-config';

// Create and export a configured Jira client instance
export const jiraClientWithAuth = new JiraApi({
  protocol: 'https',
  host: 'jira.mongodb.org',
  apiVersion: '2',
  strictSSL: true,
  username: envConfig.JIRA_USERNAME, // You'll need to extract this from your Basic auth token
  password: envConfig.JIRA_PASSWORD, // You'll need to extract this from your Basic auth token
});
