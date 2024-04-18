Starting in version 7.0, MongoDB uses a default algorithm to dynamically
adjust the maximum number of concurrent storage engine transactions
(read and write tickets). The dynamic concurrent storage engine
transaction algirithm optimizes database throughput during cluster 
overload. The maximum number of concurrent storage engine transactions
(read and write tickets) never exceeds 128 read tickets and 128
write tickets and may differ across nodes in a cluster. The maximum
number of read tickets and write tickets within a single node are always
equal. 

To specify a maximum number of read and write transactions (read and
write tickets) that the dynamic maximum can not exceed, use
:parameter:`storageEngineConcurrentReadTransactions` and
:parameter:`storageEngineConcurrentWriteTransactions`.

If you want to disable the dynamic concurrent storage engine
transactions algorithm, file a support request to work with a MongoDB
Technical Services Engineer. 