All single :method:`~db.collection.update()` and
:method:`~db.collection.remove()` operations must include the
:term:`shard key` *or* the ``_id`` field in the query
specification. :method:`~db.collection.update()` or
:method:`~db.collection.remove()` operations that affect a single
document in a sharded collection without the :term:`shard key` *or*
the ``_id`` field return an error.
