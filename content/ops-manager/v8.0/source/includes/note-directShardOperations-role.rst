You must specify the :authrole:`directShardOperations` role for sharded cluster
automation. This role allows the automation agent to perform maintenance
operations that require direct access to shards, such as adding shards to
existing clusters. For non-sharded deployments (standalone or replica sets),
you can omit this role.