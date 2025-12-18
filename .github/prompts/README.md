# Copilot Prompts - Usage Instructions
Guidance on how to use the prompts in this directory.
For more information, see the [wiki](https://wiki.corp.mongodb.com/spaces/DE/pages/346203569/Using+GitHub+Copilot+Prompts+for+Documentation)

You can use these prompts individually, or chain prompts to use multiple.

## Convert plain text to .rST
**File**: `convert-to-rst.prompt.md`
This prompt contains .rST markup instructions for our docs, so you can use it to convert plain text into properly formatted .rST components.

Example prompt: "turn the highlighted text into an .rST procedure"

Instructions: 
- You can run this in CoPilot Ask, Edit, or Agent mode
- Specify the .rST component to convert to in your prompt
- Usage options:
  - Highlight some text and then run the prompt (CoPilot will detect highlighted text)
  - Drag a file or multiple files into the context window
    - You can also tell Copilot where in the file to make this change
    - You can also run the prompt on the entire file, if applicable
  - Paste some text into the chat in Ask mode, and then run
  
## Style Guide Check
**File**: `style-guide-check.prompt.md`
This prompt contains a condensed version of the MongoDB docs style guide. You can use it to edit/revise/verify that your changes follow our style guide.

Example prompt: "Revise the highlighted text"

Instructions:
- You can run this in CoPilot Ask, Edit, or Agent mode
- Usage options:
  - Highlight some text and then run the prompt (CoPilot will detect highlighted text)
  - Drag a file or multiple files into the context window
    - You can also tell Copilot where in the file to make this change
    - You can also run the prompt on the entire file, if applicable
  - Paste some text into the chat in Ask mode, and then run

## Create Includes Files
**File**: `create-includes.prompt.md`
Thie prompt contains instructions for auto-generating and saving an includes file, including identifying the best directory to save the file, and then replacing the text with the include component.

Example prompt: "Create an include file named fact-atlas-connection.rst from the highlighted text"

Instructions: 
- Run this in Edit mode for best results
- Usage options:
  - Highlight some text, specify the name of the include file to create, and then run the prompt (Copilot will detect highlighted text). 
  - In the same chat interaction, you can drag additional files that contain this text, and you can ask Copilot to replace this text with the includes path as well.

## Turn a Code Block into a Literalinclude
**File**: `code-block-to-literalinclude.prompt.md`
Thie prompt contains instructions for auto-generating and saving a literalinclude file from a code-block, including identifying the best directory to save the file, and then replacing the code-block with the literalinclude component.

Example prompt: "Convert the code-blocks on this page to literalincludes"

Instructions: 
- Run this in Edit mode for best results.
- Usage options:
  - Highlight some text and then run the prompt (CoPilot will detect highlighted text)
  - Drag a file or multiple files into the context window

## Source Constant Substitution Check
**File**: `source-constant-substitution-check.prompt.md`
This prompt checks if some text includes substitutions or constants by opening the snooty.toml file to verify.

Example prompt: "Check for any substitutions or source constants in the highlighted text"

Instructions: 
- Run this in CoPilot Agent mode (needs to be in Agent mode in order to open the snooty.toml file)
- Highlight some text and then run the prompt (CoPilot will detect highlighted text)

<!--DO NOT USE FOR NOW - migrated from cloud-docs, might not apply to monorepo-->

## Captain Tickets
**File**: `captain-ticket.prompt.md`
This prompt contains instructions for completing a small, well-defined task and auto-generating a PR by using the GitHub CLI.

Example prompt: "<Jira ticket description>"

Before using:
- Install oh my zsh
- Install the GitHub CLI and run the following commands:
  - `gh auth login` and configure connection
  - `gh repo set-default` and select mongodb/cloud-docs
- Use this prompt in CoPilot Agent Mode 

How to use:
- First identify the impacted page(s), then drag the pages into CoPilot's context window.
- In agent mode, paste the Jira description/request and run the prompt
- Review the changes before creating the PR.

Important notes:
- This prompt is most effective for smaller, well-defined tasks. 
- When creating the PR, select 10gen/cloud-docs as the branch to push to if working off of master.

## Tutorial Converter
**File**: `convert-to-tutorial.prompt.md`

This prompt takes in content that has already been converted to RST and
modifies it so that the tone and format of the doc better fit our standard
tutorials.

Example prompt: "Convert this document into a standardized tutorial"

Before using:
- Convert the document to .rST by using `convert-to-rst.prompt.md`

Instructions:
- You can run this in CoPilot Edit or Agent mode
- Once the prompt executes, CoPilot will then prompt you on whether you want
to save the output into a file (optional)
