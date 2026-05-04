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

If your application has demanding availability and resiliency 
requirements, consider deploying a dedicated config server. A dedicated 
config server provides isolation, dedicated resources, and consistent 
performance for critical cluster operations.
