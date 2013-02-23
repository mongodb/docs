:dbcommand:`replSetSyncFrom` and :method:`rs.syncFrom()` provide a
temporary override of default behavior. If: 

- the :program:`mongod` instance restarts or 

- the connection to the sync target closes;

then, the :program:`mongod` instant will revert to the default sync
logic and target.
