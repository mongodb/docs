import { jiraClientWithAuth } from '@/utils/jira-client';
import type JiraApi from 'jira-client';
import type { JiraPayload } from './jira-builder';

export async function createJiraTicket(jiraPayload: JiraPayload): Promise<JiraApi.JsonResponse> {
  try {
    console.log('Jira ticket payload:', JSON.stringify(jiraPayload, null, 2));

    const result = await jiraClientWithAuth.addNewIssue(jiraPayload);

    console.log('Create jira ticket response:', result);
    return result;
  } catch (err) {
    console.error('Unable to create Jira ticket', err);
    throw new Error(`Unable to create Jira ticket: ${err}`);
  }
}
