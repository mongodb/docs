This example assumes that history is empty for all chunks and all chunks 
are non-jumbo. Since both conditions are true, all contiguous intervals 
on the same shard are :ref:`mergeable <mergeability>`.

Setup
-----

These chunks belong to a collection named ``coll`` with shard key ``x``.
There are nine chunks in total.

.. list-table::
   :header-rows: 1
   :widths: 25 25 25 25
   
   * - Chunk ID
     - Min
     - Max
     - Shard

   * - A
     - ``x: 0``
     - ``x: 10``
     - Shard0

   * - B
     - ``x: 10``
     - ``x: 20``
     - Shard0

   * - C
     - ``x: 20``
     - ``x: 30``
     - Shard0

   * - D
     - ``x: 30``
     - ``x: 40``
     - Shard0

   * - E
     - ``x: 40``
     - ``x: 50``
     - Shard1

   * - F
     - ``x: 50``
     - ``x: 60``
     - Shard1

   * - G
     - ``x: 60``
     - ``x: 70``
     - Shard0

   * - H
     - ``x: 70``
     - ``x: 80``
     - Shard0

   * - I
     - ``x: 80``
     - ``x: 90``
     - Shard1


Steps
-----

.. procedure::
   :style: normal

   .. step:: Merge All Mergeable Chunks on Shard0

      .. code-block:: javascript
  
         db.adminCommand( { mergeAllChunksOnShard: "db.coll", shard: "Shard0" } )


      This command merges the contiguous sequences of chunks:

      - A-B-C-D
      - G-H

   .. step:: Merge All Mergeable Chunks on Shard1
   
      .. code-block:: javascript

         db.adminCommand( { mergeAllChunksOnShard: "db.coll", shard: "Shard1" } )

      This command merges the contiguous sequences of chunks E-F.

Result
------

After these commands have completed, the contiguous chunks have been 
merged. There are four total chunks instead of the original nine.

.. list-table::
   :header-rows: 1
   :widths: 25 25 25 25
   
   * - Chunk ID
     - Min
     - Max
     - Shard

   * - A-B-C-D
     - ``x: 0``
     - ``x: 40``
     - Shard0

   * - E-F
     - ``x: 40``
     - ``x: 60``
     - Shard1

   * - G-H
     - ``x: 60``
     - ``x: 80``
     - Shard0

   * - I
     - ``x: 80``
     - ``x: 90``
     - Shard1 
