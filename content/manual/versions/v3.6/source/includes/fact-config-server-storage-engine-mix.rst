You may safely continue to use :ref:`MMAPv1 <storage-mmapv1>` for the
:term:`config servers <config server>` even if one or more :term:`shards
<shard>` in the :term:`sharded cluster` are using the WiredTiger storage
engine. If you do choose to update the config servers to use WiredTiger, you
must update **all three**.
