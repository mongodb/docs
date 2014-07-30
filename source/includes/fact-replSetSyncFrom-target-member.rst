The member to sync from must be a valid source for data in the set.
To sync from a member, the member must:

- Have data. It cannot be an arbiter, in startup or recovering mode, and
  must be able to answer data queries.

- Be accessible.

- Be a member of the same set in the replica set configuration.

- Build indexes with the
  :data:`~local.system.replset.members[n].buildIndexes` setting.

- A different member of the set, to prevent syncing from itself.

If you attempt to replicate from a member that is more than 10 seconds
behind the current member, :program:`mongod` will log a warning but will
still replicate from the lagging member.

If you run :dbcommand:`replSetSyncFrom` during initial sync, MongoDB
produces no error messages, but the sync target will not change until
after the initial sync operation.
