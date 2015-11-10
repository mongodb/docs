Starting in MongoDB 3.2, config servers are deployed as :doc:`replica set
</core/replication-introduction>` by default. The replica set config
servers must run the :doc:`WiredTiger storage engine
</core/wiredtiger>`. MongoDB 3.2 deprecates the use of three mirrored
:program:`mongod` instances for config servers.
