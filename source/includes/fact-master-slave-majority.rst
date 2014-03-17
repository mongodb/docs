.. versionadded:: 2.6
   In :doc:`Master/Slave </core/master-slave>` deployments,
   :dbcommand:`getLastError` treats ``w:majority`` as equivalent to
   ``w:1``. In earlier versions of MongoDB, ``w:majority`` produces an
   error in :doc:`master/slave </core/master-slave>` deployments.
