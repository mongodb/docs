This is particularly useful for a :binary:`~bin.mongos` if you have a client
that creates multiple connections and allows them to timeout rather
than closing them.

In this case, set :setting:`~net.maxIncomingConnections` to a value slightly
higher than the maximum number of connections that the client creates, or the
maximum size of the connection pool.

This setting prevents the ``mongos`` from causing connection spikes on
the individual :term:`shards <shard>`. Spikes like these may disrupt the
operation and memory allocation of the :term:`sharded cluster`.
