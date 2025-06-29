- You cannot run |CQA| on Atlas 
  :ref:`flex clusters <flex--cluster>` and
  serverless instances.
- You cannot run |CQA| on 
  standalone deployments.
- You cannot run |CQA| directly 
  against a :option:`--shardsvr <mongod --shardsvr>` replica set. 
  When running on a sharded cluster, 
  |CQA| must run against a 
  ``mongos``.
- You cannot run |CQA| against 
  :ref:`time series <cmd-shard-collection-timeseries>` collections.
- You cannot run |CQA| against 
  collections with :ref:`Queryable Encryption <qe-manual-feature-qe>`.
