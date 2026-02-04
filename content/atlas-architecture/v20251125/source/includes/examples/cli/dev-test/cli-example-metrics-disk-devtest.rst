.. code-block:: 
   :copyable: true

   atlas metrics disks describe atlas-lnmtkm-shard-00-00.ajlj3.mongodb.net:27017 data \
     --granularity P1D \ 
     --period P1D \
     --type DISK_PARTITION_SPACE_FREE,DISK_PARTITION_SPACE_USED \
     --projectId 6698000acf48197e089e4085 \
