.. versionadded:: 8.0

Starting in MongoDB 8.0, you can:

- Configure a config server to store your application data in 
  addition to the usual :term:`sharded cluster` metadata. A config 
  server that stores application data is called a *config shard*.
- Transition between a config shard and a dedicated
  config server.

Every sharded cluster requires a config server. A config shard qualifies
as a config server. Use a config shard instead of a dedicated config
server to reduce the number of required nodes and simplify your
deployment.

A dedicated config server requires its own replica set. A config shard
combines the config server role with an existing shard replica set, so
your cluster needs fewer replica sets and costs less. Using a config
shard has no measurable performance impact at low shard counts. 

A dedicated config server isolates cluster metadata from application
data. Certain features require this isolation. To learn which deployment
fits your cluster, see :ref:`Config Shard Use Cases
<config-shard-use-cases>`.
