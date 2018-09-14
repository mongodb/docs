.. warning::

   - If you are trying to repair a :term:`replica set` member, and you
     have access to an intact copy of your data (e.g. a recent backup
     or an intact member of the :term:`replica set`), you must restore
     from that intact copy (see
     :doc:`/tutorial/resync-replica-set-member`). A mongod started with
     :option:`mongod --repair` and modified by the operation cannot
     rejoin its original replica set without a full resync.

   - Only use :option:`mongod --repair` if you have no other options.

   - Make a backup copy of the dbpath directory before running repair.
     The operation removes without saving any corrupt data during the
     repair process.

   - If repair fails to complete for any reason, you must restart the
     instance using the :option:`--repair <mongod --repair>` option.

