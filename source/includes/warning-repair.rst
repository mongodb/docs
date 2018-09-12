.. warning::

   - Before using :dbcommand:`repairDatabase`, make a backup copy of
     the dbpath directory.

   - Avoid running :dbcommand:`repairDatabase` and its wrappers against
     a replica set. To repair a replica set member when you have access
     to an intact copy of your data (e.g. a recent backup or an intact
     member of the :term:`replica set`), restore from that intact copy
     (see :doc:`/tutorial/resync-replica-set-member`). Specific to
     :option:`mongod --repair` and replica set members, if you run
     :option:`mongod --repair` against a replica set member and the
     operation modifies the data or the metadata, you must also perform
     a full resync of the member to rejoin the replica set.

   - Only use the :dbcommand:`repairDatabase` command and associated
     wrappers, including :method:`db.repairDatabase()` and
     :option:`mongod --repair`, if you have no other options. These
     operations remove and do not save any corrupt data during the
     repair process.

   - If repair fails to complete for any reason, you must restart the
     instance using the :option:`--repair <mongod --repair>` option.

