The supporting index required by |analyzeShardKey|
is different from the supporting index required by the 
:dbcommand:`shardCollection` command. 

This table shows the supporting indexes for the same shard key for both 
|analyzeShardKey| and ``shardCollection``:

.. list-table::
   :header-rows: 1

   * - Command
     - Shard Key
     - Supporting Indexes

   * - |analyzeShardKey|
     -  ``{ a.x: 1, b: "hashed" }``
     - 
       - ``{ a.x: 1, b: 1, ... }``
       - ``{ a.x: "hashed", b: 1, ... }`` 
       - ``{ a.x: 1, b: "hashed", ... }``
       - ``{ a.x: "hashed", b: "hashed", ...}`` 

   * - ``shardCollection``
     - ``{ a.x: 1, b: "hashed" }``
     - ``{ a.x: 1, b: “hashed”, ... }``

This allows you to analyze a shard key that may not yet have a 
supporting index required for sharding it. 

Both |analyzeShardKey| and ``shardCollection`` have the following
index requirements:

- Index has a simple :ref:`collation <collation>` 
- Index is not :ref:`multi-key <index-type-multikey>`
- Index is not :ref:`sparse <index-type-sparse>`
- Index is not :ref:`partial <index-type-partial>`

To create supporting indexes, use the
:method:`db.collection.createIndex()` method.
