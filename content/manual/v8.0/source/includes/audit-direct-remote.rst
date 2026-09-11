This address identifies the host that opens the connection, even when a
load balancer or reverse proxy asserts a different client address.

MongoDB accepts proxy protocol connections on a specific port. Any host
that can reach that port can assert an arbitrary client address. To keep
the recorded address trustworthy, restrict access to that port to the
load balancer or reverse proxy.

For audit events recorded by a shard, the reported address depends on
how the shard receives the request:

- If a ``mongos`` instance routes the request, the address repeats
  the client address that ``mongos`` forwards.
- If the request comes directly from ``mongos``, the address records the
  ``mongos`` instance.
