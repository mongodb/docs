.. important::

   You must always disable the balancer on a sharded destination
   cluster by using :dbcommand:`balancerStop`. 
   After stopping the balancer, wait **fifteen minutes** before
   starting ``mongosync``. This gives the cluster time to
   finish any in-progress chunk migrations.

   If the source or destination cluster is a sharded cluster
   and you are not running ``mongosync`` with :ref:`namespace
   filtering <c2c-filtered-sync>`,
   you must disable the source cluster's balancer
   by running the :dbcommand:`balancerStop` command and waiting 15 minutes
   for the command to complete.

   If the source or destination cluster is a sharded cluster and you
   are running ``mongosync`` with namespace filtering, you can 
   globally enable the source cluster's
   balancer but you must disable it for 
   all collections within the namespace filter. 
   See :ref:`disabling-balancer-filtered`. You can also fully disable
   the source cluster's balancer.

   During migration, do not run the :dbcommand:`moveChunk` or 
   :dbcommand:`moveRange` commands. If you have enabled the source cluster's
   balancer, but disabled it for collections within the namespace
   filter, do not run :dbcommand:`shardCollection` on collections
   within the namespace filter. If you run :dbcommand:`shardCollection` on 
   collections within the namespace filter during the migration, ``mongosync``
   returns an error and stops, which requires you to start the migration
   from scratch.