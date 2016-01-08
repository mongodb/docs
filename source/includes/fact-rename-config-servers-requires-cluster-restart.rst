If the sharded cluster is using *mirrored* config servers instead of a
replica set and the name or address that a sharded cluster uses to
connect to a config server changes, you must restart **every**
:program:`mongod` and :program:`mongos` instance in the sharded cluster.
Avoid downtime by using CNAMEs to identify config servers within the
MongoDB deployment.
