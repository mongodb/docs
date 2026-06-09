Highly complex view transformations can increase indexing and query time. This is because the |mongod| must read the view definition when it filters and transforms the oplog entries during indexing (initial sync and steady state replication), and when it applies those transformations to the returned documents at query-time. 

Consider creating a :ref:`materialized view <manual-materialized-views>` to avoid extra replication load on {+service+}. You can also query the source collection directly to avoid query latency from the view transformation.

