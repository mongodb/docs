Our code examples should always follow generally accepted coding standards, security
best practices, and all other applicable guidelines in this Style Guide that
don't conflict with language-specific standards. Remember that users copy and
use these code examples outside of our docs.

Code Writing Guidelines
-----------------------

.. tip:: Treat Code Like Writing

   Apply the same general guidelines to your code examples as you
   would to your writing. Keep it simple, readable, and relevant to the task.

Keep the following in mind as you write code examples:

- Be explicit.

  - Write code that is easy to understand, even if it isn't the most efficient or clever.
  - Avoid patterns that rely on hidden, "magic", or abstracted logic (for example,
    implicit cleanup or shutdown code).

- Be intentional.

  - Think about the order you present the code elements, especially when code
    examples build on each other.
  - Match the example to the task. For example, longer, more complex usage examples
    should be reserved for tutorials.

- Be consistent.

  - Follow the language-specific style and naming conventions.
  - Use consistent and descriptive names for variables, functions, and classes.

Introductory Text
~~~~~~~~~~~~~~~~~

- Introduce each code block with context, as you would a list or table.
- Explain anything that isn't self-evident from the code, such as non-obvious
  logic, behavior, or intent.
- List any prerequisites or code dependencies needed to use or run the example.

Moving Between Files
~~~~~~~~~~~~~~~~~~~~

- Group related pieces of a workflow together when possible.
- Don't jump around between files. Instead, provide a clear path for the reader to follow.
- If needed, include visual cues with the code block to help readers, such as
  ``:caption:`` or ``:emphasize-lines:``.
  For more information, see :ref:`code-example-formatting-emphasis`.

Production-Worthy Code
~~~~~~~~~~~~~~~~~~~~~~

- If code is not intended to be directly used or adapted, such as a return
  object example snippet, make sure the code block is not copyable. To learn
  how to set the copyable option, see :ref:`code-block-reference`.
- Avoid documenting anti-patterns. If you need to note an
  anti-pattern or a commonly made mistake, communicate this clearly to readers
  using the surrounding text *and* a code comment. Ensure that
  the example cannot be mistaken for a recommended pattern.
- If a piece of code requires additional context to work, communicate
  this clearly to readers through code comments *and* the surrounding text.

Security
~~~~~~~~

- Don't use real customer data in a code example.
- Use placeholders for credentials and other sensitive information.

  .. note:

     When creating tested code examples with Grove, use environment variables in
     the test files but show placeholders in the documentation.
     For more information, see :ref:`grove-create-example-files`.

- Use language-specific best practices for handling secrets. For example, use
  environment variables in Node.js or Java system properties.

  .. important:: Never Hard-Code Secrets

     Never include real passwords, secrets, or other sensitive information
     in a code example. If you're unsure how to handle credentials in your
     code, reach out to the DevDocs team or use the
     ``#ask-devdocs`` Slack channel.