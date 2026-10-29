MongoDB can enforce a uniqueness constraint on a ranged shard key index.
Using a unique index on the shard key enforces uniqueness on the entire
key combination and not individual components of the shard key.

For a ranged sharded collection, only an index on the shard key, a
:term:`compound index` where the shard key is a :ref:`prefix
<compound-index-prefix>`, or the default ``_id`` index can be
:ref:`unique <index-type-unique>`. You cannot specify a unique
constraint on a :ref:`hashed index <index-type-hashed>`.

To learn about the restrictions that apply to unique indexes on
sharded collections, how to enforce uniqueness on the shard key
values, and how to maintain uniqueness on a field that is not your
shard key, see :ref:`manual-maintain-uniqueness-sharded`.
