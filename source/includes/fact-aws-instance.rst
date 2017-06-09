|service| deploys :program:`mongod <bin.mongod>` process to its own instance.
For sharded clusters, the six routers (the :program:`mongos <bin.mongos>`
processes) run on six of the shard servers; i.e. each of the six
:program:`mongos` processes shares an instance with one :program:`mongod
<bin.mongod>` process.
