.. note::

   Queries on the sharded collection continue to use the default
   collation configured for the collection. To use the shard key
   index's ``simple`` collation, specify ``{locale : "simple"}``
   in the query's :ref:`collation document <collation>`.
