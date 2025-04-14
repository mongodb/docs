A :term:`shard key` index can be an ascending index on the shard
key, a compound index that start with the shard key and specify
ascending order for the shard key, or a :doc:`hashed index
</core/index-hashed>`.

A :term:`shard key` index cannot be an index that specifies a
:doc:`multikey index </core/index-multikey>`, a :doc:`text index
</core/index-text>` or a :ref:`geospatial index
<index-feature-geospatial>` on the :term:`shard key` fields.

.. COMMENT seealso extracts-geospatial-index-shard-key-restriction.yaml
