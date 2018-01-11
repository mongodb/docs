|service| deploys :binary:`mongod <bin.mongod>` process to its own instance.
For sharded clusters, the six routers (the :binary:`mongos <bin.mongos>`
processes) run on six of the shard servers; i.e. each of the six
:binary:`mongos` processes shares an instance with one :binary:`mongod
<bin.mongod>` process.
