# Code Examples

This section governs how to write, format, and reference code examples in
MongoDB documentation. Apply these rules to all new and significantly revised
content.

## Directives

**Never use ``.. code-block::`` for docs-facing code examples.** Use
``.. literalinclude::`` or ``.. io-code-block::`` directives that point to an
actual code file. Hard-coded ``code-block`` directives cannot be tested or
single-sourced.

Use ``.. io-code-block::`` when the example has meaningful output that users
should see — for example, the result of a query or the response from a command.
Use ``.. literalinclude::`` when no output is shown.

Use inline monospace (double backticks) only for code references within prose,
such as method names or parameter values. Never use inline markup to display
a code example.

## Tested Examples

Tested code examples live in ``content/code-examples/tested/``. Always
reference them with a path starting from ``/code-examples/tested/``:

.. literalinclude:: /code-examples/tested/javascript/driver/crud/insert.js
   :language: javascript
   :category: usage example

Never edit files with ``.snippet.`` in the filename. These are generated
by the snip script from source example files in ``code-example-tests/``. Edit
the source file and re-run ``node snip.js`` to update the output.

## Required Directive Options

Always specify both ``:language:`` and ``:category:`` on every code directive,
including output blocks in ``io-code-block``. Omitting either is an error.

Set ``:copyable: false`` for code that is not meant to be executed — return
objects, syntax examples with placeholders, and intentionally incomplete
snippets.

Use ``:emphasize-lines:`` to highlight the most relevant lines in long
examples. Use ``:caption:`` when a procedure references multiple files, so
users know which file each block belongs to.

## Code Example Types

Apply the correct ``category`` value based on what the example is:

.. list-table::
   :header-rows: 1

   * - Category
     - Use when
   * - ``usage example``
     - Self-contained, runnable code showing how to complete a task
   * - ``snippet``
     - A partial block used to illustrate a specific concept or detail
   * - ``sample app``
     - A complete, multi-file runnable application

Snippets are not required to be valid or runnable. Usage examples must be
self-contained: all imports, connection setup, and configurable values visible
or clearly marked.

## Agent-Readability Rules

These rules apply to all code examples and make them more reliably interpreted
by AI models and agents:

- **One subject per example.** Each code block demonstrates one operation or
  concept. Do not combine setup, execution, error handling, and cleanup in a
  single block unless the page is explicitly about a full end-to-end workflow.
- **Self-contained.** Usage examples must not rely on state defined elsewhere
  on the page. Include all necessary imports, variable declarations, and
  connection setup, or use placeholders with a comment explaining what to
  replace.
- **Introduce every example.** Precede each code block with a short sentence
  stating its purpose — for example, "The following example inserts one
  document into the ``movies`` collection." This acts as a semantic anchor for
  AI retrieval.
- **Use stable, explicit values.** Prefer fixed IDs and predictable field
  values over generated or random data. Avoid time-dependent values or implicit
  defaults whose behavior changes across versions.
- **Separate code blocks with prose.** Do not place code blocks back-to-back
  without an intervening explanation. Each block should be sandwiched between
  text that gives it context.
- **Use consistent, descriptive names.** Prefer ``client``, ``collection``,
  ``filter``, ``result`` over ``foo``, ``tmp``, or overly domain-specific
  names. Keep names consistent across blocks on the same page.
