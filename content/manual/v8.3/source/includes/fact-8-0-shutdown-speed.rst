Starting in MongoDB 8.0, :method:`Bulk.insert()` and data ingestion 
workloads may perform better. However, shutting down MongoDB 
immediately after running these workloads might take longer because 
of the extra data being flushed to disk.