Prompt 2 (Ticket Creation)

=== SCOPE AND FILE CREATION RULES ===

This is a TICKET CREATION/UPDATE task. Your deliverable is a Jira ticket.

DO NOT:
    • Create, modify, or delete any files in the repository
    • Make changes to documentation content
    • Use tools like save-file, str-replace-editor, or remove-files
    • Execute any implementation work

THE ONLY PERMITTED ACTIONS:
    • Searching for Jira tickets using mcp-atlassian
    • Creating new Jira tickets using mcp-atlassian
    • Updating existing Jira tickets using mcp-atlassian, but only those with an existing AAC_featurebot label.

=== EXECUTION INSTRUCTIONS ===

Complete each phase fully before proceeding to the next. Do not skip any phase or step.

When editing components, do this via CURL commands using Bearer Token Authentication. 

──────────────────────────────────────────────────────────────────

=== Phase 1: Label Feature Ticket ===

Use mcp-atlassian to add the label "AAC_reviewed" to the feature ticket that was selected and analyzed in Prompt 1.

Complete the following steps:

Step 1: Retrieve current labels
    • Use mcp-atlassian to get the current labels on the feature ticket
    • Store all existing labels

Step 2: Add AAC_reviewed label
    • Add "AAC_reviewed" to the list of existing labels
    • Use mcp-atlassian to update the ticket with ALL existing labels plus the new "AAC_reviewed" label
    • IMPORTANT: Ensure no existing labels are removed during this operation

Step 3: Verify label addition
    • Retrieve the updated labels from the feature ticket
    • Confirm that "AAC_reviewed" is now present in the label list
    • Confirm that all previously existing labels are still present

Expected output:
    • List of labels before the update
    • Confirmation that "AAC_reviewed" was successfully added
    • List of labels after the update
    • Confirmation that no existing labels were removed

If the label addition fails or any existing labels were removed:
    • Provide root cause analysis
    • Offer assistance and/or guidance in resolving the issue
    • Do not proceed to Phase 2 until this issue is resolved

──────────────────────────────────────────────────────────────────

=== Phase 2: Search Phase ===

Use mcp-atlassian to search for any tickets with ALL of the following criteria:
    • Has the label "AAC_featurebot"
    • The ticket is not closed (include statuses: Open, In Progress, Backlog, Needs Triage, Ready for Work, etc.)
    • The topic of the AAC_featurebot ticket is related to the feature ticket analyzed in Prompt 1

Expected output: State the number of tickets found and list each ticket with its key, link, and one-sentence summary of the work required.

Decision point:

If no related tickets are found:
    • State: "No related AAC_featurebot tickets found. Proceeding to Phase 3: Ticket Creation Phase."
    • Proceed to Phase 3

If related tickets are found:
    • PAUSE and present the following to the user:
       • Link to each AAC_featurebot ticket found
       • One-sentence summary of the work required for each ticket
       • Ask: "Would you like to (A) update one of these existing tickets with additional deliverables, or (B) create a new ticket?"
    • Wait for user response
    • If user selects (A), ask which ticket to update, then proceed to Phase 4
    • If user selects (B), proceed to Phase 3
  ──────────────────────────────────────────────────────────────────

=== Phase 3: Ticket Creation Phase ===

Only execute this phase if instructed to create a new ticket.

Use mcp-atlassian to create a DOCSP ticket for work related to the analysis completed in Prompt 1.

Complete the following steps when creating the ticket:

Step 1: Set Summary field
    • Title: Same as the feature ticket analyzed in Prompt 1, with " (AAC focus)" appended to the end

Step 2: Set Issue Type field
    • Issue Type: Task

Step 3: Carry over fields from feature ticket
    • Priority: [value from feature ticket]
    • Components: [all components from feature ticket]
    • Labels: [all labels from feature ticket]
    • Due Date: [value from feature ticket, if present]
    • Assignee: [value from feature ticket, if assigned; leave blank if unassigned]
    • Docs Owner: [value from feature ticket, if assigned; leave blank if unassigned]

Step 4: Add AAC-specific label
    • In addition to any labels carried over from the feature ticket, add the label: "AAC_featurebot"

Step 5: Add AAC-specific component
    • In addition to any components carried over from the feature ticket, add the component: "Atlas Architecture Center"

Step 6: Link to feature ticket
    • Create issue link with type "is related to" pointing to the feature ticket analyzed in Prompt 1

Step 7: Link to Epic (if applicable)
    • If the feature ticket was linked to an Epic, assign the new ticket to the same Epic

Step 8: Populate Description field

Add the following content to the Description field:

Paragraph 1 (Required disclaimer):
"This ticket was generated by AI but reviewed by a human. This ticket represents a proposed series of deliverables but needs to be validated before starting work. Closing this ticket as "Won't Do" is a valid response to this ticket if the work is determined to be unnecessary."

Section: Why an Architect Would Care
    • Summarize why an architect would care about this feature
    • Explain what architectural concerns or decisions this feature affects
    • Keep this section brief (1-3 paragraphs)

Section: Proposed Deliverables
    • List the AAC documents that need to be updated based on the Output Phase from Prompt 1
    • For each document, provide:
       • Filepath
       • Document title
       • URL for the published document
       • Section(s) requiring update
       • High-level description of changes needed (1-2 sentences per change)
    • Do not go into excessive detail; the technical writer needs autonomy in how to implement these changes

Section: Key Sources
    • List relevant source documents, tickets, and links referenced in the analysis

Section: Steps for Further Exploration (if applicable)
    • If there is any uncertainty about the actions to take, list steps for further exploration to confirm the approach

Step 9: Set ticket status
    • Status: Needs Triage

Expected output: Confirm completion of each step and state: "Phase 3 complete. Proceeding to Phase 5: Validation Phase."

Proceed to Phase 5.

 ──────────────────────────────────────────────────────────────────

=== Phase 4: Ticket Update Phase ===

Only execute this phase if instructed to update an existing AAC_featurebot ticket.

Complete the following steps when updating the ticket:

Step 1: Retain and merge labels
    • Retrieve all existing labels from the AAC_featurebot ticket
    • Add any labels from the feature ticket that are not already present
    • Ensure "AAC_featurebot" label is present
    • Update the ticket with the merged label set

Step 2: Retain and merge components
    • Retrieve all existing components from the AAC_featurebot ticket
    • Add any components from the feature ticket that are not already present
    • Ensure "Atlas Architecture Center" component is present
    • Update the ticket with the merged component set

Step 3: Add issue link to feature ticket
    • Create issue link with type "is related to" pointing to the feature ticket analyzed in Prompt 1
    • Note: There should now be multiple feature tickets linked to this AAC_featurebot ticket

Step 4: Link to Epic (if applicable)
    • If the feature ticket was linked to an Epic AND the AAC_featurebot ticket is not already linked to an Epic, link the AAC_featurebot ticket to the same Epic

Step 5: Update Description field
    • Retrieve the existing description content from the AAC_featurebot ticket
    • Retain ALL existing description content
    • Add a clear separator (e.g., "--- Additional Deliverables from [FEATURE_KEY] ---")
    • Append new deliverables based on the Output Phase from Prompt 1, using the same structure as described in Phase 2, Step 8

Step 6: Add uncertainty notes (if applicable)
    • If there is any uncertainty about the actions to take, add steps for further exploration to the description

Step 7: Update ticket title (if applicable)
    • Retitle the ticket to summarize both the new and old scope if necessary. Do this only if the original ticket title is too specific for the new expanded scope.

Expected output: Confirm completion of each step and state: "Phase 4 complete. Proceeding to Phase 5: Validation Phase."

Proceed to Phase 5.

──────────────────────────────────────────────────────────────────

=== Phase 5: Validation Phase ===

In this phase you will follow different instructions depending on whether a new ticket was created or an existing ticket was updated.

When creating a new ticket (Phase 3 was executed):

    1. Confirm the new ticket number and provide a link
    2. List the outcome of each step from Phase 3:
       • Step 1 (Set Summary): ✓ Success / ✗ Failed
       • Step 2 (Set Issue Type): ✓ Success / ✗ Failed
       • Step 3 (Carry over fields): ✓ Success / ✗ Failed
       • Step 4 (Add AAC label): ✓ Success / ✗ Failed
       • Step 5 (Add AAC component): ✓ Success / ✗ Failed
       • Step 6 (Link to feature): ✓ Success / ✗ Failed
       • Step 7 (Link to Epic): ✓ Success / ✗ Failed / N/A
       • Step 8 (Populate Description): ✓ Success / ✗ Failed
       • Step 9 (Set status): ✓ Success / ✗ Failed
    3. Verify field values were carried over correctly:
       • Assignee: [value from feature ticket] → [value in new ticket] (✓ Match / ✗ Mismatch / N/A if blank in feature ticket)
       • Docs Owner: [value from feature ticket] → [value in new ticket] (✓ Match / ✗ Mismatch / N/A if blank in feature ticket)
    4. If any steps failed or field values don't match:
       • For each failed step, provide root cause analysis on why the failure occurred
       • Offer assistance and/or guidance in resolving the issue

When updating an existing ticket (Phase 4 was executed):

    1. Display the updated text of the AAC_featurebot ticket Description field, including both:
       • The retained original text
       • The newly added deliverables
    2. List the outcome of each step from Phase 4:
       • Step 1 (Retain/merge labels): ✓ Success / ✗ Failed
       • Step 2 (Retain/merge components): ✓ Success / ✗ Failed
       • Step 3 (Add issue link): ✓ Success / ✗ Failed
       • Step 4 (Link to Epic): ✓ Success / ✗ Failed / N/A
       • Step 5 (Update Description): ✓ Success / ✗ Failed
       • Step 6 (Add uncertainty notes): ✓ Success / ✗ Failed / N/A
    3. If any steps failed:
       • For each failed step, provide root cause analysis on why the failure occurred
       • Offer assistance and/or guidance in resolving the issue

Expected output: Complete validation report as specified above.

 ──────────────────────────────────────────────────────────────────

=== END OF PROMPT 2 ===

After completing all phases, take no further action unless instructed.