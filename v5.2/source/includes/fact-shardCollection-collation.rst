Collation
~~~~~~~~~

.. versionchanged:: 3.4

If the collection has a default :doc:`collation</reference/collation>`,
the |command| command must include a ``collation`` parameter with the
value ``{ locale: "simple" }``. For non-empty collections with a
default collation, you must have at least one index with the simple
collation whose fields support the shard key pattern.

You do not need to specify the ``collation`` option for collections
without a collation. If you do specify the collation option for
a collection with no collation, it will have no effect.
