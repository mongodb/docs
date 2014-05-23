On a sharded cluster, |count-op| can result in an *inaccurate* count if
:term:`orphaned documents <orphaned document>` exist or if a
:doc:`chunk migration </core/sharding-chunk-migration>` is in progress.

To avoid these situations, on a sharded cluster, use the
:pipeline:`$group` stage of the :method:`db.collection.aggregate()`
method to :group:`$sum` the documents. For example, the following
operation counts the documents in a collection:

.. code-block:: javascript

   db.collection.aggregate(
      [
         { $group: { _id: null, count: { $sum: 1 } } }
      ]
   )

To get a count of documents that match a query condition, include the
:pipeline:`$match` stage as well:

.. code-block:: javascript

   db.collection.aggregate(
      [
         { $match: <query condition> },
         { $group: { _id: null, count: { $sum: 1 } } }
      ]
   )

See :ref:`match-perform-a-count` for an example.
