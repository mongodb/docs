A :term:`shard key` index can be an ascending index on the shard
key, a compound index that starts with the shard key and specifies
ascending order for the shard key, or a :ref:`hashed index
<index-type-hashed>`.

A :term:`shard key` index *cannot* be:

- A descending index on the shard key
- A :ref:`partial index <index-type-partial>` 
- Any of the following index types: 

  - :ref:`Geospatial <index-feature-geospatial>`
  - :ref:`Multikey <index-type-multikey>`
  - :ref:`Text <index-type-text>`
  - :ref:`Wildcard <wildcard-index-core>`

.. COMMENT seealso extracts-geospatial-index-shard-key-restriction.yaml
