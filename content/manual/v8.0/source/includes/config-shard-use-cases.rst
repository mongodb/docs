A config shard costs less than a dedicated config server because a
dedicated config server runs as its own replica set. A config shard
combines the config server role into an existing shard's replica set,
so your cluster needs one replica set instead of two. Using a config
shard has no measurable performance impact at low shard counts. A
dedicated config server isolates cluster metadata from application
data, which certain features require.

Use a dedicated config server if you use one or more of the following
features:

- :ref:`Queryable Encryption <qe-manual-feature-qe>` collections
- :opsmgr:`Queryable backups </tutorial/query-backup>` (on-prem)

On {+atlas+}, a cluster automatically transitions from a config shard
to a dedicated config server when the cluster has more than three
:ref:`shards <sharding-sharded-cluster>`.
