MongoDB can enforce a uniqueness constraint on a ranged shard key index.
Using a unique index on the shard key enforces uniqueness on the entire
key combination and not individual components of the shard key.

For a ranged sharded collection, only the following indexes can be
:ref:`unique <index-type-unique>`:

- The index on the shard key

- A :term:`compound index` where the shard key is a :ref:`prefix
  <compound-index-prefix>`

- The default ``_id`` index; however, the ``_id`` index only
  enforces the uniqueness constraint **per shard** if the ``_id`` field
  is not the shard key.

.. include:: /includes/sharding/shard-collection-uniqueness-enforcement-note.rst

.. include:: /includes/sharding/sharding-unique-index-constraints.rst

To enforce uniqueness on the shard key values, pass the ``unique``
parameter as ``true`` to the :method:`sh.shardCollection()` method:

.. include:: /includes/extracts/shard-collection-unique-restriction-method.rst

You cannot specify a unique constraint on a :ref:`hashed index
<index-type-hashed>`.

To maintain uniqueness on a field that is not your shard key, 
see :ref:`shard-key-arbitrary-uniqueness`. 