While replica sets are the recommended solution for production, a
replica set can support up to :limit:`50 members
<Number of Members of a Replica Set>` in total. If your deployment
requires more than 50 members, you’ll need to use :doc:`master-slave
</core/master-slave>` replication. However, master-slave replication
lacks the automatic failover capabilities.
