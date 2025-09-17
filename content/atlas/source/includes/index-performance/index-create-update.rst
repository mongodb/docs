.. _index-create-and-update:

Creating and Updating a {+fts+} Index
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Creating a |fts| index is resource-intensive. The performance of your
|service| cluster may be impacted while the index builds. 

|service| replicates all writes on the collection. This means that for 
each collection with |fts| indexes, the writes are amplified to the 
amount of |fts| indexes defined for that collection. 

In some instances, your |fts| index must be rebuilt. Rebuilding the 
|fts| index also consumes resources and may affect database 
performance. |fts| automatically rebuilds the index only in the event 
of:

- :ref:`Changes <ref-edit-index>` to the index definition :icon-fa5:`star`
- |fts| version updates that include breaking changes
- Hardware-related problems such as index corruption

.. note:: 

   |fts| supports no-downtime indexing, which means you can continue to 
   run search queries while |fts| rebuilds your index. |fts| keeps your 
   old index up-to-date while the new index is being built. We 
   recommend allocating *free* disk space equal to 125% of the disk 
   space used by your old index for this operation. You can view the 
   amount of disk space currently used by your index in the 
   :ref:`Search Disk Space Used <review-atlas-search-metrics>` 
   metric. 

   If your index rebuild fails due to insufficient disk space, we 
   recommend that you temporarily expand your cluster capacity to meet 
   the increased demand. You can make this change manually as described in 
   :ref:`Fix Storage Issues <disk-space-used>`, 
   even for clusters with autoscaling enabled.

   If you deployed separate Search Nodes, for certain changes such as
   :ref:`Java 21 upgrade <fts20240628>`, |service| automatically deploys
   additional Search Nodes for the duration of the index rebuild and you
   don't need to allocate any additional free disk space. |service|
   doesn't deploy additional search nodes for an index rebuild that is
   caused by changes made to that index's definition. 

   Once |fts| rebuilds the index, the old index is automatically 
   replaced without any further action from your side.
