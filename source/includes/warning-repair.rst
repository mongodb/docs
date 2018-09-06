.. warning::

   - If you are trying to repair a :term:`replica set` member and you
     have access to an intact copy of your data (e.g. a recent backup
     or an intact member of the :term:`replica set`), restore from that
     intact copy (see :doc:`/tutorial/resync-replica-set-member`). Even
     if you choose to run :option:`mongod --repair` against a replica
     set member instead, if the operation modifies the data or the
     metadata, you must also perform a full resync for the member to
     rejoin the replica set.

   - Only use :option:`mongod --repair` if you have no other options.

   - Make a backup copy of the dbpath directory before running repair.
     The operation removes without saving any corrupt data during the
     repair process.

   - If repair fails to complete for any reason, you must restart the
     instance using the :option:`--repair <mongod --repair>` option.

