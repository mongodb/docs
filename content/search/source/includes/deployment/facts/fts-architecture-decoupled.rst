For production environments, we recommend a node architecture
in which MongoDB processes and |fts| processes run on separate nodes.
To deploy separate Search Nodes, see :ref:`fts-migrate-to-decoupled`.

In the following diagram of this deployment model, the |fts| ``mongot`` process runs on dedicated
Search Nodes, which are separate from the cluster nodes on which the ``mongod``
process runs.

.. image:: /includes/images/deployment/search-nodes-architecture.png
   :alt: Separate Search Nodes architecture
   :figwidth: 100%

|service| deploys Search Nodes with each cluster or
with each shard on the cluster. For example, if you deploy two Search
Nodes for a cluster with three shards, |service| deploys six Search
Nodes (two per shard). You can also configure the number of Search
Nodes and the amount of resources provisioned for each search node.

To learn how |fts| processes queries on this architecture, see
:ref:`about-mongot`.
