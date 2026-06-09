Scaling Up Indexing Performance 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can scale up your initial sync and steady state indexing for a
|fts| index by upgrading your cluster to a higher :ref:`tier 
<create-cluster-instance>` with more cores. |fts| uses a percentage of 
all available cores to run both initial sync and steady state indexing 
and performance improves as new cores are made available by upgrading 
your cluster.
