.. warning::

   - Before using :option:`--repair <mongod --repair>`, make a backup
     copy of the :option:`dbpath <mongod --dbpath>` directory.

   - Avoid running :option:`--repair <mongod --repair>` against
     a replica set:
     
     - To repair a :term:`replica set` member, if you have an intact
       copy of your data available (e.g. a recent backup or an intact
       member of the :term:`replica set`), restore from that intact
       copy instead(see :doc:`/tutorial/resync-replica-set-member`).

     - If you do choose to run :option:`mongod --repair` against a
       replica set member and the operation modifies the data or the
       metadata, you must still perform a full resync in order for the
       member to rejoin the replica set.

   - Only use :option:`mongod --repair` (and the related operations
     :dbcommand:`repairDatabase` command and
     :method:`db.repairDatabase()` method) if you have no other
     options. The operations remove and do not save any corrupt data
     during the repair process.

   - If repair fails to complete for any reason, you must restart the
     instance using the :option:`--repair <mongod --repair>` option.
