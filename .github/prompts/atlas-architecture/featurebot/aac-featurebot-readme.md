# Prerequisites

## Required:

1. Set environment variables for Jira in your `.zshrc` file (this is necessary to work around a bug in Jira MCP implementation for component editing):
   ```
   JIRA_API_TOKEN=<token>
   JIRA_EMAIL=<email>
   JIRA_URL=https://jira.mongodb.org
   ```
2. Set up MCP server for Jira & Monorepo. These steps are the same for Captain Bot - if you've already set that up, you've completed this step already.
3. Set up MCP server for Glean: This allows Augment Code to access additional sources (Confluence, Aha!, etc.) to improve recommendations and provide additional information for tickets that have limited context.

# Steps to run this bot:

## Prompt 1 steps (analysis only, no action)

1. Run `git pull origin main` to make sure content is current before starting.
2. Navigate to `~/content/atlas-architecture/current`.
3. Run Augment Code with `auggie`.
4. Set model to Sonnet, it performs better with this prompt series than Opus.
5. Run Prompt 1.
6. When Auggie is done with its Analysis, read through the results.
   - If Auggie recommends no action is required for Architecture Center and you agree with that assessment, enter Yes. Confirm that the AAC_reviewed label was added to the ticket. You're done!
   - If Auggie recommends that updates need to be made to the Architecture Center and you agree with some or all of its recommendations, enter Yes. Confirm that the AAC_reviewed label was added to the ticket and proceed to Prompt 2.
   - If you believe further analysis is required (regardless of whether Auggie recommended updates or not), or you aren't able to proceed any further for other reasons (ie: time constraints), enter No and proceed to step 6.
7. Prompt the bot for additional analysis based on any factors you think are important for it to consider, then to repeat the analysis, filtering, and output phases of prompt 1. Repeat until you can answer Yes or No as in Step 5.
8. Confirm that the AAC_reviewed label was successfully added to the feature ticket.

## Prompt 2 steps (action phase, create ticket)

1. Run Prompt 2 only if you intend to create a new ticket for Architecture Center work tied to the feature ticket analyzed in Prompt 1.
2. Determine which numbered recommendations from the output of Prompt 1 should be carried over into the new ticket.
3. Update the first sentence of Prompt 2 to replace the blank line ______ with the numbered recommendations you selected in step 1.
4. Run Prompt 2.
5. Read through the bot's list output of successful and failed steps and correct any failed steps, either manually or through Auggie.

