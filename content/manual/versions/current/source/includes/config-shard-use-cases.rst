You can consider using a config shard if your cluster has three or fewer 
shards.

If your application has demanding availability and resiliency 
requirements, consider deploying a dedicated config server. A dedicated 
config server provides isolation, dedicated resources, and consistent 
performance for critical cluster operations.

You should use a dedicated config server if you satisfy one or more of 
the following conditions:

- You plan to use more than three :ref:`shards 
  <sharding-sharded-cluster>`.
- You plan to use :ref:`Time series collections 
  <manual-timeseries-landing>` or :ref:`Queryable Encryption 
  <qe-manual-feature-qe>` collections. 
- You plan to use :opsmgr:`queryable backups 
  </tutorial/query-backup>` (on-prem).
