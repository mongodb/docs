.. warning::

   - Before using :dbcommand:`repairDatabase`, make a backup copy of
     the dbpath directory.

   - Avoid running :dbcommand:`repairDatabase` against a replica set.
     If you are trying to repair a :term:`replica set` member, and you
     have access to an intact copy of your data (e.g. a recent backup
     or an intact member of the :term:`replica set`), you should
     restore from that intact copy (see
     :doc:`/tutorial/resync-replica-set-member`), and **not** use
     :dbcommand:`repairDatabase`.

   - Only use the :dbcommand:`repairDatabase` command and associated
     wrappers, including :method:`db.repairDatabase()` and
     :option:`mongod --repair`, if you have no other options. These
     operations remove and do not save any corrupt data during the
     repair process.

