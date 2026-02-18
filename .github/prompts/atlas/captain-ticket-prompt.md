# Captain - Batch Documentation Updates

Use the mcp-atlassian mcp to select five tickets within the DOCSP project with
a label the user specifies. Prompt the user now, and do not proceed until they
provide a label. Suggested labels are `cet-captain` (Atlas docs); `quick-wins`,
`typo` (Server docs).

## Ticket Selection Phase

1. **Get User Information**: Use jira_get_user_profile_mcp-atlassian to get the current user
2. **Query and Filter**: Use mcp-atlassian to find tickets by using the filter 
   below, replacing <user_label> with the label:

   project=DOCSP AND labels=<user_label> 
   AND status in (Backlog,"Ready for Work") 
   AND (assignee is EMPTY OR assignee = currentUser()) 
   AND ("Story Points Estimate" is EMPTY OR "Story Points Estimate" <= 2)

2. **Confirm Selection**: List the selected tickets and ask for approval before
   proceeding. If approved, assign any unassigned tickets in the batch to the current JIRA user.

## Workflow for Each Ticket

You **MUST** complete all tasks in the following subsections for each ticket before moving to the next.

### Branch Creation Phase

1. First git fetch origin

2. **Branch Naming**: Create local branch name using the ticket number and 
   summary, but exlude any tags in square brackets such as [Server] and any
   fractions such as 1/4. 
   For example, a branch for https://jira.mongodb.org/browse/DOCSP-57238
   would be named DOCSP-57238-Internal-404s

   ```bash
   git checkout -b <branch name> origin/main
   ```
3. **Ensure latest changes in branch**:
   ```bash
   git merge origin/main
   ```

### Research Phase

1. **Ticket Analysis** (REQUIRED for each ticket): Read ALL comments on the ticket to learn useful context

2. **Engineering Context** (MANDATORY for each ticket):
   - Inspect ALL linked tickets (CLOUDP, SERVER, STREAMS, MHOUSE, CHARTS, SQL, DOCS, DOCSP, etc)
   - For each linked ticket, read ALL comments and descriptions
   - **REQUIRED**: If linked tickets contain PRs, use GitHub MCP to inspect code changes
   - Parse all comments on all linked issues for context

3. **Research Summary** (for each ticket): Before making changes, provide:
   - What you learned from engineering tickets and code changes
   - What you learned from product documents (if any)
   - How this context will inform your documentation approach

### Ask Phase

- Based on your research, ask the user for guidance if you need additional information to update the documentation according to the request in the ticket.

### Implementation Phase - Process each ticket individually

**MANDATORY GUIDELINES**:
   - DO NOT exceed the scope of the request, other than obvious typos or grammatical errors
   - DO NOT include information not meant for public readers of MongoDB's documentation
   - DO NOT change special formatting or .rST formatting (e.g., `{+source-constant+}`, `|substitution|`)
   - **Context-Driven Writing**: Base all content on research gathered above - do not speculate
   - Look at existing product API reference documentation for conventions and formatting examples
   - Before each heading, add unique anchor: `.. _<product-acronym>-<feature>:`
   - If you add links or cross references, you **MUST** confirm that the target exists and is accessible.

### Review Phase

1. **Senior Technical Writer Review**:
   - Review updated files in accordance with the standards at .github/prompts/style-guide-check.prompt.md

2. **Final Verification**:
   - From a human user perspective: are the additions easy to find and understand?
   - From a robot user perspective: is the content structured to facilitate ingestion?

### Commit and PR

1. Commit your changes with an appropriate, short message.

2. Push your changes to origin. If a branch with this name already exists, **DO NOT FORCE PUSH**. Notify the user.

3. Use the GitHub MCP and the `create_pull_request` tool to create a pull request. Collect a link to the PR.

## Display PR Links

When the workflow for each ticket has been completed, display the links for all PRs to the user to facilitate easy review.

## Quality Checkpoints

- [ ] All selected tickets researched thoroughly
- [ ] Review phase completed
- [ ] Ask phase completed
- [ ] PRs created successfully
- [ ] Links to all PRs sent to user
