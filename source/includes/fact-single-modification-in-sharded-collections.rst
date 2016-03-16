All |single-modification-operation-names| operations for a sharded collection
must include the :term:`shard key` *or* the ``_id`` field in the query
specification. |single-modification-operation-names| operations without the
:term:`shard key` *or* the ``_id`` field return an error.
