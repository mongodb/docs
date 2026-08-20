.. versionadded:: 8.0

Starting in MongoDB 8.0, you can:

- Configure a config server to store your application data in 
  addition to the usual :term:`sharded cluster` metadata. A config 
  server that stores application data is called a *config shard*.
- Transition a config server between being a config 
  shard and a dedicated config server.

A cluster requires a config server, but it can be a config
shard instead of a dedicated config server. Using a config shard reduces
the number of nodes required and can simplify your deployment.

A config shard costs less than a dedicated config server because a
dedicated config server runs as its own replica set. A config shard
combines the config server role into an existing shard's replica set,
so your cluster needs one replica set instead of two. Using a config
shard has no measurable performance impact at low shard counts. A
dedicated config server isolates cluster metadata from application
data, which certain features require. To learn which deployment fits
your cluster, see :ref:`Config Shard Use Cases
<config-shard-use-cases>`.
