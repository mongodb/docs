.. procedure::

   .. step:: Python does not currently use a formatter.

      The PyMongo test project does not currently use a formatter to format the
      code examples. The formatters we've tested have proven too aggressive
      at reflowing aggregation pipeline and sample data examples. We may explore
      adding a formatter at a future date.

      In the meantime, ensure your code examples follow idiomatic Python
      formatting. Refer to the `PEP 8 <https://peps.python.org/pep-0008/>`__
      style guide for more information.

   .. step:: Snip the tested examples.

      Run the following command from the ``code-example-tests/python/pymongo``
      directory to snip the tested examples:

      .. code-block:: shell

         node snip.js

      This command copies the tested examples from the ``examples`` directory
      to the ``content/code-examples/tested/python/pymongo`` directory. The
      command also uses Bluehawk to extract and transform the relevant code
      based on markup in the example files.

      The snip script is not aware of what files you have changed in the PR. It
      always snips all files in the ``examples`` directory. You'll see output
      similar to the following:

      .. code-block:: console

         Processing example files in /local-filepath/docs-mongodb-internal/code-example-tests/python/pymongo/examples
         Processed 21 file(s)
         Wrote 50 file(s) to /local-filepath/docs-mongodb-internal/content/code-examples/tested/python/pymongo
         Processing Completed.

      While the snip script processes and writes all files every time you run
      it, git only shows files that have changed. The snip script may show many
      files written, but you should only see the new or changed files in your PR.

Troubleshoot Format or Snip Issues
----------------------------------

If you encounter issues running the format or snip scripts, try the following:

- Ensure that you have Bluehawk installed by running ``npm install -g bluehawk``.
- Ensure that you are running the scripts from the ``code-example-tests/python/pymongo``
  directory.
- If you are using markup in your example files, ensure that you have the correct
  syntax. Refer to :ref:`grove-mark-up-examples` for more information.
- Ensure you're running Node.js version 24 or newer. Older Node versions may
  cause errors when running the snip scripts due to import syntax conflicts.
