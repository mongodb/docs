.. important:: Relationships cannot span partitions

   In an app that uses 
   :ref:`Partition-Based Sync <partition-based-sync>`, an object can only have
   a relationship with other objects *in the same partition*. The objects can 
   exist in different databases and collections (within the same cluster) as 
   long as the partition key value matches.
   