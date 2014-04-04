.. warning::

   During normal operations, only use the :dbcommand:`repairDatabase`
   command and wrappers including :method:`db.repairDatabase()` in the
   :program:`mongo` shell and :option:`mongod --repair`, to compact
   database files and/or reclaim disk space. Be aware that these
   operations remove and do not save any corrupt data during the
   repair process.

   If you are trying to repair a :term:`replica set` member, and you
   have access to an intact copy of your data (e.g. a recent backup or
   an intact member of the :term:`replica set`), you should restore
   from that intact copy, and **not** use :dbcommand:`repairDatabase`.
