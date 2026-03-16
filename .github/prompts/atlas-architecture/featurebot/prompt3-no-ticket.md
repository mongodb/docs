Prompt 3: Add AAC Review Comment to Ticket

=== SCOPE AND BOUNDARIES ===

This is a COMMENT-ONLY task. Your deliverable is a comment added to a Jira ticket.

DO NOT:
  - Create, modify, or delete any files
  - Execute any implementation work
  - Make changes to documentation content

THE ONLY PERMITTED ACTIONS:
  - Adding a label to the feature ticket analyzed in Prompt 1 using mcp-atlassian
  - Adding a comment to the feature ticket analyzed in Prompt 1 using mcp-atlassian

──────────────────────────────────────────────────────────────────

=== EXECUTION INSTRUCTIONS ===

Complete each phase fully before proceeding to the next. Do not skip any phase or step.

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

=== Phase 2: Add Comment to Ticket ===

Add a comment to the feature ticket analyzed in Prompt 1 documenting the AAC review outcome. Use the following template:

This ticket has gone through AI review to determine if it requires guidance updates in the Atlas Architecture Center, and the AI recommendations were human-reviewed. The AI determined that no AAC updates are necessary for this ticket. The outcome of the AI review is captured here for posterity:

  ## Filtering Phase Analysis
  **1. Does this feature change the fundamental trade-offs between architectural alternatives?**
  {ANSWER_1}
  **2. Does it introduce new risk considerations that affect strategic technology decisions?**
  {ANSWER_2}
  **3. Does it enable new architectural patterns that weren't previously viable?**
  {ANSWER_3}
  **4. Does it change the cost/benefit analysis of existing architectural recommendations?**
  {ANSWER_4}
  **5. Does it affect non-functional requirements (performance, security, cost, scalability) at a system design level?**
  {ANSWER_5}

## Conclusion
No AAC updates required - this is an operational enhancement that does not affect architectural guidance.

**Reasoning:** {BRIEF_SUMMARY_OF_WHY_NO_AAC_UPDATES_NEEDED}

Replace the placeholders with:
    • {ANSWER_1} through {ANSWER_5}: The NO answer with brief explanation for each filtering question from Prompt 1
    • {BRIEF_SUMMARY_OF_WHY_NO_AAC_UPDATES_NEEDED}: 2-3 sentence summary explaining the decision from Prompt 1

Expected output: Confirmation that the comment was successfully added to the feature ticket.

──────────────────────────────────────────────────────────────────

=== Phase 3: Validation Phase ===

Verify that all steps in this prompt were successfully completed:

1. Verify label addition (from Phase 1):
   • Confirm that "AAC_reviewed" label is present on the feature ticket
   • Confirm that no existing labels were removed
   • Status: ✓ Success / ✗ Failed

2. Verify comment addition (from Phase 2):
   • Confirm that the AAC review comment was successfully added to the feature ticket
   • Status: ✓ Success / ✗ Failed

If any steps failed:
   • For each failed step, provide root cause analysis on why the failure occurred
   • Offer assistance and/or guidance in resolving the issue

Expected output: Complete validation report confirming all steps were successful.

──────────────────────────────────────────────────────────────────

=== END OF PROMPT 3 ===

After completing all phases, take no further action unless instructed.