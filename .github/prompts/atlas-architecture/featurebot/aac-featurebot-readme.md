# Prerequisites

## Required:

1. Set environment variables for Jira in your `.zshrc` file (this is necessary to work around a bug in Jira MCP implementation for component editing):
   ```
   JIRA_API_TOKEN=<token>
   JIRA_EMAIL=<email>
   JIRA_URL=https://jira.mongodb.org
   ```
2. [Set up MCP server for Jira & Monorepo](https://wiki.corp.mongodb.com/spaces/DE/pages/474350958/Captain+Bot). These steps are the same for Captain Bot - if you've already set that up, you've completed this step already.
3. [Set up MCP server for Glean](https://app.glean.com/settings/install): This allows Augment Code to access additional sources (Confluence, Aha!, etc.) to improve recommendations and provide additional information for tickets that have limited context. In the Glean UI:
   - Click **Configure MCP Server**
   - For host, select **Claude for Desktop**
   - For authentication method, select **OAuth**
   - Click **Save**

   Then, add the following to the mcpServers object to your `~/.augment/settings.json` file:
   ```json
   "mcpServers": {
    "glean_default": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://mongodb-be.glean.com/mcp/default"
      ]
    }
  },
   ```

# Steps to run this bot:

## Overview

This bot uses a three-prompt workflow to analyze feature tickets and determine if they require updates to the Atlas Architecture Center (AAC):

1. **Prompt 1 (Analysis)**: Analyzes a feature ticket and recommends whether AAC updates are needed
2. **Prompt 2 (Create Ticket)**: Creates or updates a Jira ticket for AAC work (if updates are needed)
3. **Prompt 3 (No Ticket)**: Adds a review comment to the feature ticket (if no updates are needed)

## Workflow Steps

### Step 1: Run Prompt 1 (Analysis)

1. Navigate to `~/content/atlas-architecture/current`.
2. Run `git pull origin main` to ensure content is current before starting.
3. Run Augment Code with `auggie`.
4. Set model to Sonnet (Sonnet performs better with this prompt series than Opus).
5. Run Prompt 1 (`prompt1-analysis.md`).
6. Review the agent's analysis and recommendations.

### Step 2: Provide Feedback (if needed)

If you need clarification or disagree with the agent's recommendations:
- Ask follow-up questions or provide additional context
- Request the agent to repeat the analysis, filtering, and output phases with your feedback incorporated
- Repeat until you agree with the agent's assessment

### Step 3: Proceed to Prompt 2 or Prompt 3

Once you agree with the agent's recommendations:

**If AAC updates ARE needed:**
- Run Prompt 2 (`prompt2-create-ticket.md`)
- The agent will:
  - Add the "AAC_reviewed" label to the feature ticket
  - Search for existing related AAC_featurebot tickets
  - Either create a new AAC ticket or update an existing one with the recommended deliverables
  - Link the AAC ticket to the feature ticket and any relevant Epic

**If NO AAC updates are needed:**
- Run Prompt 3 (`prompt3-no-ticket.md`)
- The agent will:
  - Add the "AAC_reviewed" label to the feature ticket
  - Add a comment documenting the review outcome and reasoning

### Step 4: Verify Completion

Review the agent's validation output to confirm all actions were successfully completed:
- For Prompt 2: Verify the ticket was created/updated correctly and all fields were set properly
- For Prompt 3: Verify the label and comment were added to the feature ticket
- If any steps failed, work with the agent to resolve the issues manually or through additional prompts

### Step 5: Reset Context Before Next Run

Before analyzing another ticket, run the `/new` command in Augment Code CLI (Auggie) to start a fresh conversation. This prevents context from the previous ticket analysis from influencing the next prompt series run.

