If you have an existing :binary:`~bin.mongod` instance and
:setting:`dbpath`, and you want to enable
|directoryperdb-option-name|, you **must** migrate your existing
databases to directories before setting |directoryperdb-option-name|
to access those databases.

.. example::

   Given a :setting:`dbpath` directory with the following items:

   .. code-block:: none

      journal
      mongod.lock
      local.0
      local.1
      local.ns
      test.0
      test.1
      test.ns

   To enable |directoryperdb-option-name| you would need to modify the
   :setting:`dbpath` to resemble the following:

   .. code-block:: none

      journal
      mongod.lock
      local/local.0
      local/local.1
      local/local.ns
      test/test.0
      test/test.1
      test/test.ns
