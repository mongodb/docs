A :term:`shard key` index can be an ascending index on the shard
key, a compound index that start with the shard key and specify
ascending order for the shard key, or a :ref:`hashed index
<index-type-hashed>`.

A :term:`shard key` index cannot be an index that specifies a
:ref:`multikey index <index-type-multikey>`, a :ref:`text index 
<index-type-text>` or a :ref:`geospatial index
<index-feature-geospatial>` on the :term:`shard key` fields.

.. COMMENT seealso extracts-geospatial-index-shard-key-restriction.yaml
