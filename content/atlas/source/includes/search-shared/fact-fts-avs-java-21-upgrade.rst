.. note:: 

   |service| will reindex all of your existing |fts| indexes on the
   |service| {+cluster+} in a rolling manner. The {+atlas-ui+} will
   display alerts that indicate the timing of your reindexing.
   {+Clusters+} not using separate search nodes might notice a temporary
   increase in disk and CPU utilization during reindexing. For
   {+clusters+} using separate search nodes, |service| will temporarily
   deploy additional nodes for free for reindexing and there will be no downtime
   for swapping of indexes when the new index build completes.