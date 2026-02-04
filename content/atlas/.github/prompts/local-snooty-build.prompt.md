# Local Snooty Build

Run a local Snooty parser build for the Atlas documentation and analyze any build errors.

## Instructions

First, determine the repository root by finding the `content` directory in the workspace. The `CONTENT_ROOT` refers to the path ending in `content` (e.g., `/path/to/docs-mongodb-internal/content`). The `ATLAS_ROOT` refers to `${CONTENT_ROOT}/atlas`.

1. **Set up the environment**: Navigate to the `tools/local-snooty-build` directory and run the environment setup script:

   ```bash
   cd ${CONTENT_ROOT}/tools/local-snooty-build && bash create_snooty_env.sh
   ```

2. **Activate the virtual environment**:

   ```bash
   source ${CONTENT_ROOT}/tools/local-snooty-build/.venv/bin/activate
   ```

3. **Run the Snooty build**: Navigate to the Atlas content root and run the build with JSON diagnostics output to a log file:

   ```bash
   cd ${ATLAS_ROOT} && DIAGNOSTICS_FORMAT=JSON snooty build . 2>&1 > /tmp/snooty-build-log.txt
   ```

4. **Read and Parse Build Output**: After the build completes, read the log file and analyze the JSON diagnostics:

   ```bash
   cat /tmp/snooty-build-log.txt
   ```

   Each diagnostic is a JSON object with:
   - `severity`: `INFO`, `WARNING`, or `ERROR`
   - `start`: Line number in the source file
   - `message`: Description of the issue
   - `path`: Relative path to the source file

   Filter for actual errors and warnings (ignore `INFO` level diagnostics):
   - **Errors**: Diagnostics with `"severity": "ERROR"`
   - **Warnings**: Diagnostics with `"severity": "WARNING"`

5. **Suggest Fixes**: For each error or warning found:
   - Identify the source file and line number from the JSON diagnostic
   - Explain the nature of the error
   - Provide a concrete fix using the appropriate edit tool
   - Preserve all RST formatting, custom substitutions (like `{+avs+}`, `|fts|`, `|service|`), and directive syntax
   
   **User Choice**: If the user chooses to skip a suggested edit, respect their decision and continue to the next error or proceed to cleanup. Do not block on user acceptance of fixes.

## Error Categories to Watch For

| Error Type | Pattern | Common Fix |
|------------|---------|------------|
| Undefined reference | `Unknown target name` | Add missing ref target or fix typo in reference |
| Invalid directive | `Unknown directive type` | Check directive spelling or add required extension |
| Indentation error | `Unexpected indentation` | Align content with directive properly |
| Missing include | `Include file not found` | Verify include path is correct |
| Duplicate label | `Duplicate explicit target name` | Rename one of the duplicate labels |
| Malformed role | `Unknown interpreted text role` | Fix role syntax or use correct role name |

## Output Format

After running the build, report:

1. **Build Summary**: Total errors, warnings, and files processed
2. **Error Details**: For each error, provide:
   - File path and line number
   - Error message
   - Suggested fix with code snippet
3. **Automated Fixes**: Use edit tools to apply fixes where the solution is unambiguous

## Notes

- The Snooty parser validates RST syntax, cross-references, and MongoDB-specific directives
- Build output goes to `./build` relative to the content root
- Always preserve MongoDB documentation conventions and custom formatting

## Cleanup

After the build output has been analyzed and fixes have been suggested/applied (or skipped by the user), **always** run the cleanup script to remove the cloned snooty-parser repository and virtual environment. This prevents pushing a repo within a repo to GitHub:

```bash
bash ${CONTENT_ROOT}/tools/local-snooty-build/cleanup_snooty_env.sh
```

**Important**: Always run cleanup before committing changes to avoid Git submodule issues. Cleanup must run regardless of whether the user accepted, rejected, or skipped any suggested fixes.
