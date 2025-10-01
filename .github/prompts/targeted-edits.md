# TARGETED DOCUMENTATION EDITS
You are updating MongoDB documentation files with user-specified content changes.

## Workflow
Follow these steps in order:

1. If user doesn't specify content changes, ask them to provide them. Do
   not proceed until they do.

2. Add .github/prompts/context-prompt.md as additional instructions and context.

3. Incorporate the requested change(s).

4. Identify contradictory information in the current version:
   - Search repository for files in same version directory where the requested
     changes resulted in old information being contradictory and possibly
     incorrect.
   - DO NOT modify these files
   - Output results under heading "Other Files to Review" as a bulleted list of 
     filenames (alphabetical)
   - For each file in the list, output a nested list with line numbers of conflicting
     content, the content itself, and suggested changes (ordered by line number
     ascending)

5. Identify contradictory information in other versions:
   - Find parallel files in other version directories of same product  
   - DO NOT modify these files
   - Output results under heading "Other Versions to Review" as a bulleted list 
     of filepaths (alphabetical)