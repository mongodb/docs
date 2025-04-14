A MongoDB :term:`sharded cluster` consists of the following components:

- :ref:`shard <shards-concepts>`: Each shard contains a
  subset of the sharded data. Each shard can be deployed as a :term:`replica
  set`.

- :doc:`/core/sharded-cluster-query-router`: The ``mongos`` acts as a
  query router, providing an interface between client applications and the
  sharded cluster.

- :ref:`config servers <sharding-config-server>`: Config
  servers store metadata and configuration settings for the cluster. As
  of MongoDB 3.4, config servers must be deployed as a replica set (CSRS).

.. COMMENT TODO post code review, use this include file in /core/sharded-cluster-components.txt and /sharding.txt since they had duplicate content.
