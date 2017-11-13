An existing collection can only be sharded if its size does not exceed
specific limits. These limits can be estimated based on the average size of
all :term:`shard key` values, and the configured :term:`chunk` size.

.. important:: 
   
   These limits only apply for the initial sharding operation. Sharded
   collections can grow to *any* size after successfully enabling sharding.

Use the following formulas to calculate the *theoretical* maximum
collection size. 

.. code-block:: javascript

   maxSplits = 16777216 (bytes) / <average size of shard key values in bytes>
   maxCollectionSize (MB) = maxSplits * (chunkSize / 2)

.. note::
   
   The maximum :term:`BSON` document size is 16MB or ``16777216`` bytes.
   
   All conversions should use base-2 scale, e.g. 1024 kilobytes = 1
   megabyte.

If ``maxCollectionSize`` is less than or nearly equal to the target
collection, increase the chunk size to ensure successful initial sharding.
If there is doubt as to whether the result of the calculation is too
'close' to the target collection size, it is likely better to increase the
chunk size.

After successful initial sharding, you can reduce the chunk size as needed.
If you later reduce the chunk size, it may take time for all chunks to
split to the new size. See
:doc:`/tutorial/modify-chunk-size-in-sharded-cluster` for instructions on
modifying chunk size.

This table illustrates the approximate maximum collection sizes
using the formulas described above:

.. list-table::
   :header-rows: 1
   :stub-columns: 1

   * - Average Size of Shard Key Values
     - 512 bytes
     - 256 bytes
     - 128 bytes
     - 64 bytes
   * - Maximum Number of Splits
     - 32,768
     - 65,536
     - 131,072
     - 262,144
   * - Max Collection Size (64 MB Chunk Size)
     - 1 TB
     - 2 TB
     - 4 TB
     - 8 TB
   * - Max Collection Size (128 MB Chunk Size)
     - 2 TB
     - 4 TB
     - 8 TB
     - 16 TB
   * - Max Collection Size (256 MB Chunk Size)
     - 4 TB
     - 8 TB
     - 16 TB
     - 32 TB
