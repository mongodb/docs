For testing and prototyping environments, we recommend a node
architecture in which MongoDB processes and {+fts+} processes run on the
same node. In the following diagram of this deployment model, the {+fts+}
``mongot`` process runs alongside ``mongod`` on each node in the
|service| cluster and they share the same resources.

.. image:: /images/deployment/fts-architecture-diagram.png
   :alt: MongoDB Search architecture
   :figwidth: 100%

By default, |service| enables the {+fts+} ``mongot`` process on the same
node that runs the ``mongod`` process when you create your first
|product-name| index.

When you run a query, {+fts+} uses the :ref:`configured read preference
<replica-set-tags>` to identify the node on which to run the query. The
query first goes to the MongoDB process, which is ``mongod`` for a
replica set cluster or ``mongos`` for a sharded cluster.

For a replica set cluster, the ``mongod`` process routes the query
to the ``mongot`` on the same node. For sharded clusters, your cluster
data is partitioned across ``mongod`` instances (shards) and each
``mongot`` process can only access the data on the ``mongod`` instance
on the same node. Therefore, you can't run {+fts+} queries that target a
particular  shard. ``mongos`` routes the query to all shards, making
these *scatter gather* queries. If you use :manual:`zones
</core/zone-sharding/>` to distribute a sharded collection over a
subset of the shards in the cluster, {+fts+} routes the query to the
zone that contains the shards for the collection that you are querying
and runs your :pipeline:`$search` queries on just the shards where the
collection is located.

After the query is routed to a {+fts+} ``mongot`` process, the ``mongot``
process performs the search and scoring and returns the document IDs and
other search metadata for the matching results to its corresponding
``mongod`` process. The ``mongod`` process then performs a full document
lookup implicitly for the matching results and returns the results to
the client. If you use the :pipeline:`$search` :ref:`concurrent
<concurrent-ref>` option in your query, {+fts+} enables intra-query
parallelism. To learn more, see :ref:`Parallelize Query Execution Across
Segments <concurrent-ref>`.

To learn more about the ``mongot`` process, see :ref:`about-mongot`.
