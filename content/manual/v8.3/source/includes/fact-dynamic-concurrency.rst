Starting in version 7.0, MongoDB uses a default algorithm to dynamically
adjust the maximum number of concurrent storage engine transactions, 
or read and write tickets. The dynamic concurrent storage engine
transaction algorithm optimizes database throughput during cluster 
overload. 

.. note::
   
   The dynamic algorithm also results in lower overall ticket usage, even
   under normal conditions, because the algorithm starts with a much
   lower baseline number of available tickets. As a result, when upgrading to
   MongoDB 7.0, you may observe a significant drop in ticket usage, which is
   expected behavior.

The maximum number of concurrent storage engine transactions,
or read and write tickets, never exceeds 128 read tickets and 128
write tickets and may differ across nodes in a cluster. The maximum
number of read tickets and write tickets within a single node are always
equal. 

To specify a maximum number of read and write transactions, or read and
write tickets, that the dynamic maximum can not exceed, use
:parameter:`storageEngineConcurrentReadTransactions` and
:parameter:`storageEngineConcurrentWriteTransactions`.

If you want to disable the dynamic concurrent storage engine
transactions algorithm, file a support request to work with a MongoDB
Technical Services Engineer. 