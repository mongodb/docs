.. warning::

   During normal operations, the :dbcommand:`repairDatabase()` 
   command and wrappers including
   :method:`db.repairDatabase()` in the :program:`mongo` shell and
   :option:`mongod --repair` should only be used to compact database
   files and/or reclaim disk space. Be aware that any corrupt data
   will be removed (and lost) during the repair process.
   
   If you are trying to repair a :term:`replica set` member, and you
   have access to an intact copy of your data (e.g. a recent backup or
   an intact member of the :term:`replica set`), you should restore
   from that intact copy, and **not** use :dbcommand:`repairDatabase`.
