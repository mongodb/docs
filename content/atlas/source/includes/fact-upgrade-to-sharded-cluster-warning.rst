To convert a singular replica set cluster to a multi-shard, sharded cluster,
you must first convert to a **single** shard sharded cluster, restart your
application and **reconnect to the cluster**, and then add additional shards.

If you don't restart the application clients, your data might be inconsistent
once |service| begins distributing data across shards.

If you don't reconnect the application clients, your application may suffer
from data outages.

- If you are using a
  :ref:`DNS Seed List <connections-dns-seedlist>`
  connection string, your application automatically connects to the
  :binary:`mongos` for your sharded {+cluster+}.

- If you are using a :ref:`standard connection string
  <connections-standard-connection-string-format>`,
  you must update your connection string to reflect your new {+cluster+}
  topology.
  