:dbcommand:`replSetSyncFrom` and :method:`rs.syncFrom()` provide a
temporary override of default behavior. If the :program:`mongod`
restarts or the connection to the sync target closes,
:program:`mongod` will revert to the default sync logic and target.
