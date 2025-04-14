:dbcommand:`replSetSyncFrom` and :method:`rs.syncFrom()` provide a
temporary override of default behavior. If:

- the :binary:`~bin.mongod` instance restarts or

- the connection to the sync target closes;

then, the :binary:`~bin.mongod` instance will revert to the default sync
logic and target.
