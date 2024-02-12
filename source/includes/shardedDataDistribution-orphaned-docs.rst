Starting in MongoDB 6.0.3, you can run an aggregation using the 
:pipeline:`$shardedDataDistribution` stage to confirm no orphaned 
documents remain:

.. code-block:: javascript
    
   db.aggregate([
      { $shardedDataDistribution: { } },
      { $match: { "ns": "<database>.<collection>" } }
   ])

``$shardedDataDistribution`` has output similar to the following:

.. include:: /includes/shardedDataDistribution-output-example.rst

Ensure that ``"numOrphanedDocs"`` is ``0`` for each shard in the
cluster.

