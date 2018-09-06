.. warning::

   - If you are trying to repair a :term:`replica set` member, and you
     have access to an intact copy of your data (e.g. a recent backup
     or an intact member of the :term:`replica set`), you should
     restore from that intact copy (see
     :doc:`/tutorial/resync-replica-set-member`).

   - Only use :option:`mongod --repair` if you have no other options.

   - Make a backup copy of the dbpath directory before running repair.
     The operation removes without saving any corrupt data during the
     repair process.

