Each :program:`mongod <bin.mongod>` process is deployed to its own AWS EC2 instance.
For sharded clusters, the six routers (the :program:`mongos <bin.mongos>` processes)
run on six of the shard servers; i.e. each of the six :program:`mongos`
processes shares an AWS EC2 instance with one :program:`mongod <bin.mongod>` process.
