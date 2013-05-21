While replica sets are the recommended solution for production, a
replica set can support only 12 members in total. If your deployment
requires more than 12 members, you’ll need to use
:doc:`/core/master-slave` replication. Master-slave replication lacks
the automatic failover capabilities.
