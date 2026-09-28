.. warning::
   
   Starting in MongoDB version 8.2, long-running secondary reads in a 
   sharded cluster may automatically terminate before orphaned document 
   deletion following a chunk migration.

   The :parameter:`terminateSecondaryReadsOnOrphanCleanup` parameter 
   controls this behavior. To learn more about handling long-running
   secondary reads, see :ref:`long-running-secondary-reads`.