.. important::

   Sharded clusters do not enforce the uniqueness constraint on ``_id`` fields 
   across the cluster when the ``_id`` field is not the shard key.

   If the ``_id`` field is not the shard key, the uniqueness constraint only 
   applies to the shard that stores the document. This means that two or more
   documents can have the same ``_id`` value, provided they occur on different
   shards.

   For example, consider a sharded collection with shard key ``{x:
   1}`` that spans two shards A and B. Because the ``_id`` key is
   not the shard key, the collection could have a document
   with ``_id`` value ``1`` in shard A and another document with
   ``_id`` value ``1`` in shard B.

   In cases where the ``_id`` field is not the shard key, MongoDB expects
   applications to ensure the uniqueness of ``_id`` values across the shards,
   for example, by using a unique identifier to populate the ``_id`` field.