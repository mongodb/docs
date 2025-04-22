To verify that you are using MongoDB Enterprise, pass the ``--version``
command line option to the :binary:`~bin.mongod` or :binary:`~bin.mongos`:

.. code-block:: sh

   mongod --version

In the output from this command, look for the string ``modules:
subscription`` or ``modules: enterprise`` to confirm you are using the
MongoDB Enterprise binaries.
