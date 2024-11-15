.. important::

   When the source or destination cluster is a sharded cluster, you must stop 
   the balancer on both clusters and not run the :dbcommand:`moveChunk` or
   :dbcommand:`moveRange` commands for the duration of the migration. To stop 
   the balancer, run the :dbcommand:`balancerStop` command and wait for the 
   command to complete.
