MongoDB provides no method to deactivate sharding for a collection
after calling :dbcommand:`shardCollection`. Additionally, after
:dbcommand:`shardCollection`, you cannot change the selection of the
shard key. However, starting in MongoDB 4.2, you can update a
document's shard key value (unless the shard key field is the immutable
``_id`` field).  For details, see :ref:`update-shard-key`.
