These size recommendations are a best practice. They are not a
limitation of the MongoDB database or |mms|.

Backup and restore can use large amounts of CPU, memory, storage, 
and network bandwidth.

.. example::

   Your stated network throughput, such as 10 Gbps or 100 Gbps, is 
   a *theoretical* maximum. That value doesn't account for sharing 
   or throttling of network traffic.

   Consider the following scenario:

   - You want to back up a 2 TB database.
   - Your hosts support a 10 Gbps TCP connection from |mms| to its
     backup storage.
   - The network connection has very low packet loss and a low round
     trip delay time.

   Under such circumstances, a *full* backup of your data could 
   take *more than 30 hours to complete*.

   This doesn't account for disk read and write speeds, which can be,
   at most, 3 Gbps reads and 1 Gbps writes for a single or mirrored
   NVMe storage device.

   The time required to complete each successive incremental backup
   depends on write load.

   If you :doc:`shard this database 
   </tutorial/convert-replica-set-to-sharded-cluster>`
   into 4 shards, each shard runs its backup separately. This results
   in a backup that takes less than 8 hours to complete.


