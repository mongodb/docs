In sharded clusters that enable the ingress request rate limiter, shard
nodes that are shedding load can return errors labeled 
``SystemOverloadedError``.

For clusters that have :parameter:`overloadAwareServerSelectionEnabled` set to
``true``, when a primary responds with a retryable error labeled with 
``SystemOverloadedError``, the router may temporarily route reads to eligible 
secondaries instead of the overloaded server. This applies to any read 
preference that can select multiple servers. By default, 
``overloadAwareServerSelectionEnabled`` is set to ``false``.
