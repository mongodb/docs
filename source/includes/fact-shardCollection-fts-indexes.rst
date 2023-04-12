.. note::

   If you run :method:`sh.shardCollection() <sh.shardCollection>` on an 
   unsharded collection with |fts| indexes, the |fts| indexes 
   might enter an invalid state after sharding. To mitigate this issue, 
   you can create a new index on the collection after sharding, or 
   :ref:`contact support <request-support>` to restart the ``mongot`` 
   processes on the nodes.
