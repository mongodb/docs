MongoDB does not support unique indexes across shards, except when
the unique index contains the full shard key as a prefix of the
index. In these situations MongoDB will enforce uniqueness across
the full key, not a single field.

.. see:: :ref:`shard-key-arbitrary-uniqueness`
   for an alternate approach.
   
