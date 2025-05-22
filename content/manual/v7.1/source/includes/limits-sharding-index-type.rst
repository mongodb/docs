A :term:`shard key` index can be an ascending index on the shard
key, a compound index that starts with the shard key and specifies
ascending order for the shard key, or a :ref:`hashed index
<index-type-hashed>`.

A :term:`shard key` index cannot be a descending index on the shard key.
Additionally, a shard key index cannot be any of the following index
types:

- :ref:`multikey <index-type-multikey>`
- :ref:`text <index-type-text>`
- :ref:`geospatial <index-feature-geospatial>`
- :ref:`wildcard <wildcard-index-core>`

.. COMMENT seealso extracts-geospatial-index-shard-key-restriction.yaml
