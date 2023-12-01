For an operation to succeed, the view of the metadata on the specific 
shard member must be up-to-date. The shard and the router issuing the 
request must have the same version of the chunks metadata.

If the metadata is not up-to-date, the operation fails with the 
``StaleConfig`` error and the metadata refresh process is triggered.
Refreshing the metadata can introduce additional operational latency.

On a secondary, a metadata refresh can take a long time if there
is significant replication lag. For secondary reads, set 
``maxStalenessSeconds`` to minimize the impact of replication lag.
