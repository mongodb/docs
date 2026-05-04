Starting in MongoDB 5.0, :readconcern:`"local"` is the default read concern level for read
operations against the primary and secondaries. In MongoDB 4.4, queries targeting sharded
cluster secondaries use read concern :readconcern:`"available"` and can return
:term:`orphaned documents <orphaned document>`.

This may introduce a significant latency increase for count queries that use a filter and
for :ref:`covered queries <covered-queries>`.

You can opt out of this behavior by setting the cluster-wide :ref:`read concern
<read-concern>` with :dbcommand:`setDefaultRWConcern`.