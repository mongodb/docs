.. |single-modification-operation-names| replace::


All |single-modification-operation-names| operations for a sharded
collection that affect a single document must include the
:term:`shard key` *or* the ``_id`` field in the query
specification. |single-modification-operation-names| operations that affect a single
document in a sharded collection without the :term:`shard key` *or*
the ``_id`` field return an error.
