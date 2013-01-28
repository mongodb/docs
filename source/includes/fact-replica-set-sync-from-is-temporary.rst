:dbcommand:`replSetSyncFrom` and :method:`rs.syncFrom()` provide a
temporary override of default behavior. If the :program:`mongod`
restarts, the connection to the sync target closes, or the sync target falls
more than 30s behind another node, :program:`mongod` will revert to
the default sync logic and target.
