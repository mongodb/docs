.. procedure::

   .. step:: Format the code examples.

      The test suite uses the a formatting tool to format the code examples.
      Run the following command from the ``code-example-tests/java/driver-sync``
      or ``code-example-tests/java/driver-reactive``
      directory to format the code examples:

      .. code-block:: shell

         mvn format

      This command runs the formatter against all files in the ``src/main/java``
      directory.

      A GitHub workflow checks to ensure that you have run the formatter on
      your code before you commit your changes. If you forget to run the
      formatter, the workflow reminds you and provides instructions for
      correcting the issue.

   .. step:: Snip the tested examples.

      Run the following command from the ``code-example-tests/java/driver-sync``
      or ``code-example-tests/java/driver-reactive`` directory to snip the
      tested examples:

      .. code-block:: shell

         node snip.js

      This command copies the tested examples from the ``src/main/java`` directory
      to the ``content/code-examples/tested/java/driver-sync`` or
      ``content/code-examples/tested/java/driver-reactive`` directory. The
      command also uses Bluehawk to extract and transform the relevant code
      based on markup in the example files.

      The snip script is not aware of what files you have changed in the PR. It
      always snips all files in the ``examples`` directory. You'll see output
      similar to the following:

      .. code-block:: console

         Processing example files in /path/to/docs-mongodb-internal/code-example-tests/java/driver-sync/src/main/java
         Processed 15 file(s)
         Wrote 51 file(s) to /path/to/docs-mongodb-internal/code-example-tests/java/driver-sync/src/main/temp

      While the snip script processes and writes all files every time you run
      it, git only shows files that have changed. The snip script may show many
      files written, but you should only see the new or changed files in your PR.

      The snip script also runs the formatting tool on the output files. You'll
      see additional output similar to the following:

      .. code-block:: console

         Running formatter.
         Formatter Output:
         [INFO] Spotless.Format is keeping 71 files clean - 0 were changed to be clean, 71 were already clean, 0 were skipped because caching determined they were already clean
         [INFO] Spotless.Java is keeping 13 files clean - 0 were changed to be clean, 0 were already clean, 13 were skipped because caching determined they were already clean
         Formatting completed.
         Moving formatted files to output directory: /path/to/docs-mongodb-internal/content/code-examples/tested/java/driver-sync
         Temporary directory cleaned up: /path/to/docs-mongodb-internal/code-example-tests/java/driver-sync/src/main/temp

      If you do not have Maven installed, the snip script does not run the
      formatting tool and displays a warning message.

Troubleshoot Format or Snip Issues
----------------------------------

If you encounter issues running the format or snip scripts, try the following:

- Ensure that you have Bluehawk installed by running ``npm install -g bluehawk``.
- Ensure that you are running the scripts from the ``code-example-tests/java/driver-sync``
  or ``code-example-tests/java/driver-reactive`` directory.
- If you are using markup in your example files, ensure that you have the correct
  syntax. Refer to :ref:`grove-mark-up-examples` for more information.
- Ensure you're running Node.js version 24 or newer. Older Node versions may
  cause errors when running the snip scripts due to import syntax conflicts.
