|service| can generate an optimized |srv| connection string for sharded 
{+clusters+} using the load balancers from your private endpoint
service. When you use an optimized connection string, |service| limits
the number of connections per ``mongos`` between your application and
your sharded {+cluster+}. The limited connections per ``mongos``
improve performance during spikes in connection counts.
   