|service| {+Cluster+} Configuration Change
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you reconfigure your deployment to use the local |nvme| storage type
or upscale an |nvme|-based {+cluster+}, |fts| performs an initial sync
of all configured |fts| indexes after each node completes its underlying
configuration or upscale action. If the |fts| index initial syncs take
longer than the time it took to complete the {+cluster+} configuration
change, you can't run :pipeline:`$search` queries until the initial
sync completes on all the nodes in your |service| {+cluster+}. 

We recommend deploying :ref:`dedicated Search Nodes
<configure-search-nodes>` to scale your |service| {+cluster+} and
:pipeline:`$search` workloads independently. Dedicated Search Nodes
run only the ``mongot`` process and therefore improve the availability, 
performance, and workload balancing of the ``mongot`` process.

.. include:: /includes/search-shared/fact-fcis.rst