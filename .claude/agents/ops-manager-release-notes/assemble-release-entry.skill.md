# Skill: assemble-release-entry

<description>
Combine improvement and bug fix entries into a complete versioned RST block for an Ops Manager patch release.
</description>

<input>
version: string                # Ops Manager patch version (e.g., "8.0.25")
release_date: string           # YYYY-MM-DD (e.g., "2026-07-15")
improvement_entries:           # Array of RST entry strings from write-improvement-entry skill
  - string
bug_entries:                   # Array of RST entry strings from write-bug-entry skill (may be empty)
  - string
</input>

<output>
rst: string  # Complete RST section ready to prepend to the changelog
</output>

<instructions>

## Step 1: Create the Anchor

Format: `.. _opsmgr-server-{version}:`

Example: `.. _opsmgr-server-8.0.25:`

## Step 2: Create the Title

Format: `|onprem| Server {version}`
Underline with tildes (`~`) matching the rendered title length exactly.

Because `|onprem|` expands to "Ops Manager" (11 chars), the rendered title is `Ops Manager Server {version}`. Count the rendered length for the underline.

Example for version `8.0.25`:
- Rendered title: `Ops Manager Server 8.0.25` (25 chars)
- Underline: 25 tildes

```rst
|onprem| Server 8.0.25
~~~~~~~~~~~~~~~~~~~~~~
```

## Step 3: Add Release Date Line

One blank line after the underline, then:

```rst
*Released {YYYY-MM-DD}*
```

## Step 4: Add Improvements Section

Heading:

```rst
Improvements
~~~~~~~~~~~~
```

Then list all improvement entries, each separated by a blank line.

The final two entries in Improvements are always synthesized by the orchestrator and passed as the last two items in `improvement_entries`:

1. **Second-to-last**: MongoDB Agent version line
   ```rst
   - Updates the {+mdbagent+} to
     :ref:`{agent_version} <mongodb-{agent_version}>`.
   ```

2. **Last**: Database tools line
   ```rst
   - Supports :dbtools:`MongoDB Database Tools {db_tools_version}
     </release-notes/dbtools-{db_tools_version}-changelog/>`.
   ```

Do not reorder the entries passed in.

## Step 5: Add Bug Fixes Section (conditional)

If `bug_entries` is non-empty, add:

```rst
Bug Fixes
~~~~~~~~~
```

Then list all bug entries, each separated by a blank line.

If `bug_entries` is empty, **omit the Bug Fixes section entirely**.

## Step 6: Final Formatting

- All lines wrapped at 72 characters
- Continuation lines indented 2 spaces
- Blank line between each bullet entry
- Two blank lines after the last entry before the end of the block

</instructions>

<rules>
- Agent version line is always second-to-last in Improvements
- Database tools line is always last in Improvements
- Bug Fixes section is omitted entirely when bug_entries is empty
- NO Jira keys in output
- All lines at most 72 characters
- Use `|onprem|` for "Ops Manager" and `{+mdbagent+}` for "MongoDB Agent"
</rules>

<examples>

<example name="with_bugs">
Input:
```yaml
version: "8.0.25"
release_date: "2026-07-15"
improvement_entries:
  - |
    - Adds support for MongoDB on RHEL 9 (``ppc64le``) in the
      |onprem| UI.
  - |
    - Adds OAuth 2.0 client credentials authentication for webhook
      alert notifications.
  - |
    - Updates the {+mdbagent+} to
      :ref:`108.0.25.9030-1 <mongodb-108.0.25.9030-1>`.
  - |
    - Supports :dbtools:`MongoDB Database Tools 100.18.0
      </release-notes/dbtools-100.18.0-changelog/>`.
bug_entries:
  - |
    - Fixes an issue where |onprem| could return an internal server
      error (HTTP 500) for a backup rollback request on a cluster
      with no active backup status.
```

Output:
```yaml
rst: |
  .. _opsmgr-server-8.0.25:

  |onprem| Server 8.0.25
  ~~~~~~~~~~~~~~~~~~~~~~

  *Released 2026-07-15*

  Improvements
  ~~~~~~~~~~~~

  - Adds support for MongoDB on RHEL 9 (``ppc64le``) in the
    |onprem| UI.

  - Adds OAuth 2.0 client credentials authentication for webhook
    alert notifications.

  - Updates the {+mdbagent+} to
    :ref:`108.0.25.9030-1 <mongodb-108.0.25.9030-1>`.

  - Supports :dbtools:`MongoDB Database Tools 100.18.0
    </release-notes/dbtools-100.18.0-changelog/>`.

  Bug Fixes
  ~~~~~~~~~

  - Fixes an issue where |onprem| could return an internal server
    error (HTTP 500) for a backup rollback request on a cluster
    with no active backup status.

```
</example>

<example name="no_bugs">
Input:
```yaml
version: "8.0.26"
release_date: "2026-08-12"
improvement_entries:
  - "- Adds support for new backup storage backend."
  - |
    - Updates the {+mdbagent+} to
      :ref:`108.0.26.9045-1 <mongodb-108.0.26.9045-1>`.
  - |
    - Supports :dbtools:`MongoDB Database Tools 100.18.1
      </release-notes/dbtools-100.18.1-changelog/>`.
bug_entries: []
```

Output:
```yaml
rst: |
  .. _opsmgr-server-8.0.26:

  |onprem| Server 8.0.26
  ~~~~~~~~~~~~~~~~~~~~~~

  *Released 2026-08-12*

  Improvements
  ~~~~~~~~~~~~

  - Adds support for new backup storage backend.

  - Updates the {+mdbagent+} to
    :ref:`108.0.26.9045-1 <mongodb-108.0.26.9045-1>`.

  - Supports :dbtools:`MongoDB Database Tools 100.18.1
    </release-notes/dbtools-100.18.1-changelog/>`.

```
</example>

</examples>
