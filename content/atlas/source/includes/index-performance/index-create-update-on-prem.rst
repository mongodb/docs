Creating and Updating a {+fts+} Index
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Creating a |fts| index is resource-intensive. The performance of your
cluster may be impacted while the index builds. 

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
   amount of disk space currently used by your index by using the 
   index ID to find ``mongot_index_stats_indexSizeBytes`` in the 
   Prometheus metrics for the target index.

   If your index rebuild fails due to insufficient disk space, we 
   recommend that you temporarily expand your cluster capacity to meet 
   the increased demand. 

   Once |fts| rebuilds the index, the old index is automatically 
   replaced without any further action from your side.
