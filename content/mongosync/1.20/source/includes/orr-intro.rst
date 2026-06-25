Starting in {+c2c-beta-program-short+} 1.8, you can enable Oplog Rollover 
Resilience (ORR). With ORR,  ``mongosync`` applies changes made on the source 
cluster to the destination cluster concurrently with initial sync. For source 
clusters with a high write rate, ORR significantly lowers the risk of oplog 
rollover during initial sync and reduces the need to restart the sync.
