- |service| deploys each :manual:`shard </core/sharded-cluster-shards>` 
  as a three-node replica set, where each node deploys using the 
  configured :guilabel:`Cloud Provider & Region`, 
  :guilabel:`Cluster Tier`, and :guilabel:`Additional Settings`. 
  |service| deploys one :binary:`~bin.mongod` per shard node.

  For cross-region clusters, the number of nodes per shard 
  is equal to the total number of electable and read-only nodes across
  all configured regions. |service| distributes the shard nodes across
  the selected regions.

- |service| deploys the :ref:`config servers <sharding-config-server>`
  as a three-node replica set. The config servers run on
  M30 cluster tiers. 

  For cross-region clusters, |service| distributes the config server
  replica set nodes to ensure optimal availability. For example, 
  |service| might deploy the config servers across three distinct 
  availability zones and three distinct regions if supported by
  the selected cloud service provider and region configuration.

- |service| deploys one :binary:`mongos <bin.mongos>` router for each 
  node in each shard. For cross-region clusters, this allows clients 
  using a MongoDB driver to connect to the geographically "nearest" 
  :binary:`mongos <bin.mongos>`.

  To calculate the number of :binary:`mongos <bin.mongos>` 
  routers in a cluster, multiply the number of shards by the number of 
  replica set nodes per shard.
