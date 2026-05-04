Fragmentation is where a sharded collection's data is broken up into an
unnecessarily large number of small chunks. This can increase operation
times of CRUD operations run on that collection. Defragmentation reduces
the number of chunks by merging smaller chunks into larger ones,
resulting in lower CRUD operation times.

If CRUD operation times are acceptable, you don't need to defragment
collections.

The following table summarizes defragmentation information for various
MongoDB versions.

.. list-table::
   :header-rows: 1
   :widths: 30 70
 
   * - MongoDB Version
     - Description

   * - MongoDB 7.0 and later
     - Chunks are automatically merged. Performance improvements from
       defragmenting a collection in MongoDB 7.0 are lower compared to
       MongoDB 6.0. Typically, you don't need to defragment collections
       starting in MongoDB 7.0.

   * - MongoDB 6.0 and earlier than 7.0
     - Defragment collections only if you experience CRUD operation
       delays when the balancer migrates chunks or a node starts.

       Starting in MongoDB 6.0, high write traffic should not cause
       fragmentation. Chunk migrations cause fragmentation.

   * - Earlier than MongoDB 6.0
     - Defragment collections only if you experience longer CRUD
       operation times during metadata updates. For MongoDB versions
       earlier than 6.0, a sharded collection becomes fragmented when
       the collection size grows significantly because of many insert or
       update operations.
