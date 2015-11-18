Starting in MongoDB 3.2, config servers for sharded clusters can be
deployed as a :doc:`replica set </core/replication-introduction>`. The
replica set config servers must run the :doc:`WiredTiger storage engine
</core/wiredtiger>`. MongoDB 3.2 deprecates the use of three mirrored
:program:`mongod` instances for config servers.
