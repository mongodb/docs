Config servers for sharded clusters can be
deployed as a :ref:`replica set <replication>` (CSRS). 
Using a replica set for the config
servers improves consistency across the config servers, since MongoDB
can take advantage of the standard replica set read and write protocols
for the config data. In addition, using a replica set for config
servers allows a sharded cluster to have more than 3 config servers
since a replica set can have up to 50 members. To deploy config servers
as a replica set, the config servers must run the :ref:`storage-wiredtiger`. 

