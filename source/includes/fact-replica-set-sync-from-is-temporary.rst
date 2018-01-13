:dbcommand:`replSetSyncFrom` and :method:`rs.syncFrom()` provide a
temporary override of default behavior. :binary:`~bin.mongod` will revert
to the default sync behavior in the following situations:

- The :binary:`~bin.mongod` instance restarts.

- The connection between the :binary:`~bin.mongod` and the sync target
  closes.

.. versionchanged:: 2.4
   The sync target falls more than 30 seconds behind another member of
   the replica set; the :binary:`~bin.mongod` will revert to the default
   sync target.
