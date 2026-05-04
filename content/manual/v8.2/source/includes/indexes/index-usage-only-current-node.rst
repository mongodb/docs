.. warning::

   :pipeline:`$indexStats` reports index usage metrics in the
   :ref:`accesses <indexStats-output-accesses>` field only for the node
   where the query runs. For more comprehensive index usage statistics,
   run :pipeline:`$indexStats` on each node in the cluster.