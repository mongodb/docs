A MongoDB :term:`sharded cluster` consists of the following components:

- :ref:`shard <shards-concepts>`: Each shard contains a
  subset of the sharded data. Each shard must be deployed as a :term:`replica
  set`.

- :doc:`/core/sharded-cluster-query-router`: The ``mongos`` acts as a
  query router, providing an interface between client applications and the
  sharded cluster.

- :ref:`config servers <sharding-config-server>`: Config
  servers store metadata and configuration settings for the cluster.
  Config servers must be deployed as a replica set (CSRS). Starting in
  MongoDB 8.0, you can deploy the config server as a
  :ref:`config shard <config-shard-concept>` that also stores
  application data.
