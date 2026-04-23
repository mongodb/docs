For production environments, we recommend a node architecture in which
MongoDB processes and {+fts+} processes run on separate nodes. To deploy
separate Search Nodes, see :ref:`fts-migrate-to-decoupled`.

In the following diagram of this deployment model, the {+fts+} ``mongot``
process runs on dedicated Search Nodes, which are separate from the
cluster nodes on which the ``mongod`` process runs.

.. image:: /images/deployment/search-nodes-architecture.png
   :alt: Separate Search Nodes architecture
   :figwidth: 100%

|service| deploys Search Nodes with each cluster or with each shard
on the cluster. For example, if you deploy two Search Nodes for a
cluster with three shards, |service| deploys six Search Nodes (two
per shard). You can also configure the number of Search Nodes and the
amount of resources provisioned for each search node.

When you deploy separate Search Nodes, |service| automatically assigns a
``mongod`` for each ``mongot`` for indexing. The ``mongot`` communicates
with the ``mongod`` to listen for and sync index changes for the indexes
that it stores. |product-name| indexes and processes your queries
similar to a deployment where both the ``mongod`` and ``mongot``
processes run on the same node. To learn more, see |index-doc| and
|query-doc|. To learn more about deploying Search Nodes separately, see
:ref:`configure-search-nodes`.

When you migrate to Search Nodes, |service| deploys the Search Nodes,
but doesn't serve queries on the nodes until it successfully builds all
the indexes on the cluster on the Search Nodes. While |service|
builds the indexes on the new nodes, it continues to serve queries using
the indexes on the cluster nodes. |service| starts serving queries
from the Search Nodes only after it successfully builds the indexes on
the Search Nodes and removes the indexes on the cluster nodes.

.. note::

   .. include:: /includes/deployment/facts/fact-fcis.rst

When you run a query, the query routes to the ``mongod`` based on the
:ref:`configured read preference <replica-set-tags>`. The ``mongod``
process routes the search query through a load balancer on the same
node, which distributes the requests across all of the ``mongot``
processes.

The {+fts+} ``mongot`` process performs the search and scoring and returns
the document IDs and metadata for the matching results to ``mongod``.
The ``mongod`` then performs a full document lookup for the matching
results and returns the results to the client. If you use the
:pipeline:`$search` :ref:`concurrent <concurrent-ref>` option in your
query, {+fts+} enables intra-query parallelism. To learn more, see
:ref:`Parallelize Query Execution Across Segments <concurrent-ref>`.

If you delete all the Search Nodes on your cluster, there will be an
interruption in processing your search query results. To learn more, see
:ref:`Modify a Cluster <scale-cluster-cloud-provider>`. If you delete
your |service| cluster, |service| pauses and then deletes all
associated |product-name| deployments (``mongot`` processes).
