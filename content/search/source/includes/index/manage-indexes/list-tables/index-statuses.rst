.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Status
     - Description

   * - Pending 
     - |service| has not yet started building the index.

   * - Building 
     - |service| is building the index or re-building the 
       index after an edit. When the index is in this state:
       
       - For a new index, |fts| doesn't serve queries until the 
         index build is complete. 
       - For an existing index, you can continue to use the old index 
         for existing and new queries until the index rebuild 
         is complete.

   * - Ready
     - Index is ready to use.

   * - Stale
     - Index is stale because of any of the following reasons: 
       
       - Replication stopped due to high disk utilization. 
       
         For dedicated ``mongot`` nodes, the pause replication threshold
         is 90% and the resume replication threshold is 85% disk utilization. 
         For colocated ``mongot`` nodes, the pause replication threshold
         is 96% and the resume replication threshold is 94% disk utilization.

       - If replication stops for a long period, the |fts| ``mongot``
         process falls off the oplog. 
  
         This state commonly occurs when the current replication point
         is no longer available on the |mongod| oplog. |service|
         rebuilds index if the ``mongot`` process falls off the oplog.

       - Index reached the two billion document limit.

       - Replication failed due to an error.
       
       You can still query the existing index. However, the results for 
       queries against a stale index might contain stale data. You can
       upscale your search nodes for more disk space and delete existing
       indexes to release disk space. Alternatively, use the error in the
       :guilabel:`View status details` modal window to troubleshoot the
       issue. To learn more, see :ref:`atlas-search-alerts`.

   * - Failed 
     - |service| could not build the index. Use the error  
       in the :guilabel:`View status details` modal window to 
       troubleshoot the issue. To learn more, see 
       :ref:`atlas-search-alerts`.

   * - Deleting
     - MongoDB is deleting the index from the cluster nodes.

   * - Does not Exist
     - Index is invalid because the collection for the index no longer
       exists. You can't run queries on this index because there is no 
       corresponding collection for this index. |service| will
       eventually delete the index.