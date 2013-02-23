:dbcommand:`replSetSyncFrom` and :method:`rs.syncFrom()` provide a
temporary override of default behavior. If: 

- the :program:`mongod` instance restarts,

- the connection to the sync target closes, or 

- the sync target falls more than 30 seconds behind another member of
  the replica set (v2.4 only)

then, the :program:`mongod` instant will revert to the default sync
logic and target.
