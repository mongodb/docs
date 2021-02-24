Once the upgrade completes, you must **restart all application clients**
and reconnect to your sharded cluster. If you don't restart the
application clients, your data might be inconsistent once |service|
begins distributing data across shards.

- If you are using a
  :manual:`DNS Seed List </reference/connection-string/#dns-seed-list-connection-format>`
  connection string, your application automatically connects to the
  :binary:`mongos` for your sharded cluster.

- If you are using a
  :manual:`standard connection string
  </reference/connection-string/#standard-connection-string-format>`,
  you must update your connection string to reflect your new cluster
  topology.
  