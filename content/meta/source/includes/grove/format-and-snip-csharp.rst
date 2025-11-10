.. procedure::

   .. step:: Format the code examples.

      The test suite uses the ``.editorconfig`` file to format the code examples. 
      Run the following command from the ``code-example-tests/csharp/driver``
      directory to format the code examples:

      .. code-block:: shell

         dotnet format

      This command runs the linter, which automatically uses the ``.editorconfig`` 
      file, against all files in the solution.

      A GitHub workflow checks to ensure that you have run the formatter on
      your code before you commit your changes. If you forget to run the
      formatter, the workflow reminds you and provides instructions for
      correcting the issue.

   .. step:: Snip the tested examples.

      Run the following command from the ``code-example-tests/csharp/driver``
      directory to snip the tested examples:

      .. code-block:: shell

         node snip.js

      This command copies the tested examples from the ``examples`` directory
      to the ``content/code-examples/tested/csharp/driver`` directory. The
      command also uses Bluehawk to extract and transform the relevant code
      based on markup in the example files.

      The snip script is not aware of what files you have changed in the PR. It
      always snips all files in the ``examples`` directory. You'll see output
      similar to the following:

      .. code-block:: console

         Processing example files in /local-filepath/docs-mongodb-internal/code-example-tests/csharp/driver/examples
         Processed 21 file(s)
         Wrote 50 file(s) to /local-filepath/docs-mongodb-internal/content/code-examples/tested/csharp/driver
         Processing Completed.

      While the snip script processes and writes all files every time you run
      it, git only shows files that have changed. The snip script may show many
      files written, but you should only see the new or changed files in your PR.

Troubleshoot Format or Snip Issues
----------------------------------

If you encounter issues running the format or snip scripts, try the following:

- Ensure that you have Bluehawk installed by running ``npm install -g bluehawk``.
- Ensure that you are running the scripts from the ``code-example-tests/csharp/driver`` 
  directory.
- If you are using markup in your example files, ensure that you have the correct
  syntax. Refer to :ref:`grove-mark-up-examples` for more information.
- Ensure you're running Node.js version 24 or newer. Older Node versions may
  cause errors when running the snip scripts due to import syntax conflicts.
