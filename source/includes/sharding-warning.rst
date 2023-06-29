
.. warning::

   Syncing large documents to a sharded destination cluster can cause 
   the destination cluster to initiate chunk migration.  When the destination
   cluster migrates chunks during sync, it may trigger a bug that can result
   in data loss.

   To avoid this, it is recommended that you run the :dbcommand:`balancerStop`
   command on the destination cluster before starting a sync.  Once ``mongosync``
   completes the sync, you can restart the balancer with the 
   :dbcommand:`balancerStart` command.

