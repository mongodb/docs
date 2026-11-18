Starting in MongoDB 8.0, a config server can store application data in
addition to sharded cluster metadata. A config server that stores
application data is called a :ref:`config shard
<config-shard-concept>`. In the :data:`~config.shards` collection, an
entry with ``_id: "config"`` identifies the config server.

A config server runs shard components, including a shard identity
document and cached routing table collections, even when it doesn't
store application data. This procedure updates
sharding metadata on the config server replica set as well as on each shard
replica set. A config server's shard name is always ``config`` and doesn't
change during a restore. 

.. important:: 

   Don't update the shard name on the config server, even if you change the CSRS
   replica set name.
