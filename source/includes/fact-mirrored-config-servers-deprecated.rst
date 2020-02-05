Starting in MongoDB 3.2, config servers for sharded clusters can be
deployed as a :manual:`replica set </replication>`. The
replica set config servers must run the :manual:`WiredTiger storage engine
</core/wiredtiger>`. MongoDB 3.2 deprecates the use of three mirrored
:binary:`~bin.mongod` instances for config servers.
