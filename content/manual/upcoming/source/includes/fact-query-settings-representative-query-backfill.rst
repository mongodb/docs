Starting in MongoDB 8.3, MongoDB backfills the
``representativeQuery`` field for query settings that you set with a
query shape hash. When MongoDB runs a query that matches the query
shape, it schedules the backfill. The backfill requires no action from
you.

The backfill runs asynchronously on a best-effort basis to limit the
performance impact on your queries. A query setting isn't guaranteed to
be backfilled the first time a matching query runs. If a backfill
doesn't complete, MongoDB attempts it again the next time a matching
query runs.

To hold the additional representative queries, MongoDB 8.3 also
increases the storage capacity for representative queries in query
settings beyond the original 16 MB BSON document limit.
