- You cannot run |analyzeShardKey| on Atlas
  :ref:`shared clusters <shared-tier-cluster>` and
  serverless instances.
- You cannot run |analyzeShardKey| on standalone deployments.
- You cannot run |analyzeShardKey| directly against a
  :option:`--shardsvr <mongod --shardsvr>` replica set.
  When running on a sharded cluster, |analyzeShardKey|
  must run against a ``mongos``.
- You cannot run |analyzeShardKey| against
  :ref:`time series <cmd-shard-collection-timeseries>` collections.
- You cannot run |analyzeShardKey| against collections
  with :ref:`Queryable Encryption <qe-manual-feature-qe>`.
