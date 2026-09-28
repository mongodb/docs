.. _sharding-internals-shard-key-indexes:
.. _sharding-shard-key-indexes:
.. _shard-key-indexes-page:

=================
Shard Key Indexes
=================

.. meta::
   :description: Learn how indexes are related to shard keys in MongoDB.

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 2
   :class: singlecol

Sharded collections typically require an index that supports the
:term:`shard key`. The index can be an index on the shard key or a
:term:`compound index` where the shard key is a :ref:`prefix
<compound-index-prefix>` of the index.

- If the collection is empty, :method:`sh.shardCollection()` creates
  the index on the shard key if such an index does not already exists.

- If the collection is not empty, you must create the index first
  before using :method:`sh.shardCollection()`.

You cannot :ref:`drop <collection-drop-index>` or 
:ref:`hide <collection-hide-index>` an index if it is the only 
non-hidden index that supports the shard key.

Starting in MongoDB 7.0.3, 6.0.12, and 5.0.22, you can drop the index
for a :ref:`hashed shard key <sharding-hashed-sharding>`. For details,
see :ref:`<drop-a-hashed-shard-key-index>`.

.. _sharding-shard-key-unique:

Unique Indexes
--------------

.. include:: /includes/sharding/shard-key-indexes-unique-indexes.rst