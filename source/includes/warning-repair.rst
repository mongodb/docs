.. warning::

   In general, if you have an intact copy of your data, such as
   would exist on a very recent backup or an intact member of a
   :term:`replica set`, **do not** use :dbcommand:`repairDatabase`
   or related options like :method:`db.repairDatabase()` in the
   :binary:`~bin.mongo` shell or :option:`mongod --repair`. Restore
   from an intact copy of your data.
