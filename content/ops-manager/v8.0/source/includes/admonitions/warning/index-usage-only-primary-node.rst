.. warning:: 

   The Data Explorer only shows :guilabel:`Usage` metrics for the
   primary node in your cluster. If your application primarily reads
   from secondary nodes, the :guilabel:`Usage` metrics do not accurately
   reflect index usage across your cluster.

   For more comprehensive index usage statistics, run the
   :pipeline:`$indexStats` aggregation stage on each node in your
   cluster.