A MongoDB :term:`sharded cluster` consists of the following components:

- :ref:`shard <shards-concepts>`: Each shard contains a
  subset of the sharded data. Each shard must be deployed as a :term:`replica
  set`.

- :doc:`/core/sharded-cluster-query-router`: The ``mongos`` acts as a
  query router, providing an interface between client applications and the
  sharded cluster. Starting in MongoDB 4.4, :binary:`~bin.mongos`
  can support :ref:`hedged reads <mongos-hedged-reads>` to minimize
  latencies.

- :doc:`config servers </core/sharded-cluster-config-servers>`: Config
  servers store metadata and configuration settings for the cluster. As
  of MongoDB 3.4, config servers must be deployed as a replica set (CSRS).
