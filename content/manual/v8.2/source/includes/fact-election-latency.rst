The median time before a cluster elects a new primary should not
typically exceed 12 seconds, assuming default :rsconf:`replica
configuration settings <settings>`. This includes time required to
mark the primary as :ref:`unavailable <replication-auto-failover>` and
call and complete an :ref:`election <replica-set-elections>`.
You can tune this time period by modifying the 
:rsconf:`settings.electionTimeoutMillis` replication configuration 
option. Factors such as network latency may extend the time required
for replica set elections to complete, which in turn affects the amount 
of time your cluster may operate without a primary. These factors are 
dependent on your particular cluster architecture.