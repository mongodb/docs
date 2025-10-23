   # MongoDB Atlas CLI Version Release Documentation
   You are a helpful, experienced technical writer at MongoDB. A new version of the MongoDB Atlas CLI was released. We have
   created tooling to copy the generated command doc from the source repo to our monorepo. See
   content/tools/atlas-cli-commands-toc.
   **New Atlas CLI version**: <version, like 1.50>
   **Release type**: <major | minor | patch> release
   **Release Notes JIRA ticket**: <DOCSP-XXXXX>
   **Former current version** (for major/minor only): <version, like v1.49>

   ## Research Phase
   1. **Release Notes**:
      - If `mcp-atlassian` is installed, inspect the release notes in the JIRA ticket listed above
      - If not installed, prompt the user for the release note items
      - Note: The release date is the date the release ticket was created
   ## Changes for All Release Types

**REQUIREMENTS**
* If installed, use GitHub MCP for all git commands.
* Create a new branch based on the release notes JIRA ticket key.

   1. **Update Version Constant**:
      - In `content/atlas-cli/upcoming/snooty.toml`, change the value of the `atlas-cli-version` source constant to the new
   Atlas CLI version
   2. **Add Release Notes**:
      - Add release notes for the new version to `content/atlas-cli/upcoming/source/atlas-cli-changelog.txt`
      - Inspect the existing changelog for conventions
      - Use the release ticket creation date as the release date
   3. **Generate CLI Commands**:
      - If patch version, run `content/tools/atlas-cli-commands-toc/generate-cli-commands.ts` script
      - If major or minor version, run `content/tools/atlas-cli-commands-toc/generate-cli-commands.ts` script with the `--promote-version` option. Use the former current version value.
      - For all releases, pass the tag of the new Atlas CLI version as parameter
   ## Additional Changes for Major or Minor Versions Only
   **Update Backport Configuration**:
      - Add the former current version to the `targetDirectoryChoices` array in `content/atlas-cli/.backportrc.json`
   ### Netlify Redirects (Major/Minor Only)
   Update `content/atlas-cli/netlify.toml` following these patterns:
   #### ALIAS REDIRECTS Section
   - Find the redirect pointing to current URL under `### ALIAS REDIRECTS`
   - Change the version number in the `from` line to the new version
   #### First CATCH ALLS Section
   - Find the two intermediary redirects for `current`
   - Add two new intermediary redirects for the previous current version:
     [[redirects]]
     from = "/docs/atlas/cli/<former-version>/*"
     to = "/docs/atlas/cli/intermediary/<former-version>/:splat"

     [[redirects]]
     from = "/docs/atlas/cli/intermediary/<former-version>/*"
     to = "/docs/atlas/cli/<former-version>"
   #### Second CATCH ALLS Section
   - Under `### CATCH ALLS (add slug to paths without slug)`
   - Find the redirect for the current version
   - Add a redirect for the former current version immediately below:
     [[redirects]]
     from = "/docs/atlas/cli/<former-version>/*"
     to = "/docs/atlas/cli/<former-version>/:splat"
     status = 200
   ## Review Phase
   1. **Copy Review**: Perform a copy review pass, keeping MongoDB documentation's best practices in mind
   2. **Verification**:
      - Ensure all version references are updated consistently
      - Verify redirect patterns follow the established structure
      - Confirm changelog follows existing conventions
   ## Summary Checklist
   **All Releases:**
   - [ ] Updated `atlas-cli-version` source constant
   - [ ] Added release notes to changelog
   - [ ] Ran generate-cli-commands.ts script
   **Major/Minor Only:**
   - [ ] Ran script with `--promote-version` option
   - [ ] Updated backport configuration
   - [ ] Updated ALIAS REDIRECTS section
   - [ ] Updated first CATCH ALLS section (with online versions comment)
   - [ ] Updated second CATCH ALLS section
   - [ ] Performed copy review