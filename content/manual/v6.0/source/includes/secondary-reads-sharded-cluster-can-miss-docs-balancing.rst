.. warning:: Secondary Reads in a Sharded Cluster with Migrations Can Miss Documents

   Long-running secondary reads in a sharded cluster can miss documents 
   if migrations are occurring.

   Before deleting a chunk during chunk migration, MongoDB waits for 
   :parameter:`orphanCleanupDelaySecs`, or for in-progress queries 
   involving the chunk to complete on the shard primary, whichever is 
   longer. Queries that were initially run on a node that was primary, 
   but continue after the node has stepped down to a secondary, will be 
   treated as if they were initially executed on a secondary. That is,
   the server only waits for ``orphanDelayCleanupSecs`` if there are no 
   queries targeting the chunk on the current primary.
 
   Queries that target the chunk and are run on secondaries may miss 
   documents if these queries take longer than 
   ``orphanCleanupDelaySecs``.
