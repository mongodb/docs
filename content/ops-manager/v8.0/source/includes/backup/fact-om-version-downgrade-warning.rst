.. warning::

   Restore the application database to a primary |onprem| that runs
   the same version as, or a later version than, the original primary
   |onprem| that the snapshot was taken from. If the replacement
   binary is older than the application database's recorded version,
   |onprem| refuses to start with a "Downgrades are not permitted"
   error.
