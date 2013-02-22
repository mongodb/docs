.. note::

   For bulk inserts on sharded clusters, the :dbcommand:`getLastError`
   command alone is insufficient to verify success. Applications
   should must verify the success of bulk inserts in application
   logic.
