To scale up a replica set to a multi-sharded {+cluster+},
you must scale up to a **single** shard {+cluster+} first,
restart your application and **reconnect to the cluster**, and then add
additional shards.

If you don't restart the application clients, your data might be inconsistent
once |service| begins distributing data across shards.

If you don't reconnect the application clients, your application may suffer
from data outages.

- If you are using a
  :manual:`DNS Seed List </reference/connection-string/#dns-seed-list-connection-format>`
  connection string, your application automatically connects to the
  :binary:`mongos` for your sharded {+cluster+}.

- If you are using a
  :manual:`standard connection string
  </reference/connection-string/#standard-connection-string-format>`,
  you must update your connection string to reflect your new {+cluster+}
  topology.
  