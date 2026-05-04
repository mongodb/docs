Starting in MongoDB 8.0, you can configure a config server to store your 
application data in addition to the usual sharded cluster metadata. A 
:binary:`mongod` node that provides both config server and shard server 
functionality is called a config shard. A ``mongod`` node that runs as a 
standalone :option:`--configsvr` without shard server functionality 
is called a dedicated :ref:`config server 
<sharded-cluster-config-server>`.
