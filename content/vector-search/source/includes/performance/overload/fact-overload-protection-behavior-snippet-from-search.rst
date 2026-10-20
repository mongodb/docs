.. This file is snippet output generated from content/search/source/includes/performance/overload/fact-overload-protection-behavior.rst.
   Do not modify this file. Edit the source file instead.

The |fts| process (``mongot``) runs queries in a fixed execution pool.
When queries arrive faster than the process can run them, |service|
holds the excess queries in an admission control queue rather than
running them all at once. Search Load Shedding governs this
queue. It protects the search process from memory exhaustion and from
the latency collapse that occurs when a process accepts more
concurrent work than it can complete.

Search Load Shedding applies to both :pipeline:`$search` and
:pipeline:`$vectorSearch` queries. It's available on clusters running
MongoDB 8.0, 8.3, and 9.0 or later, and |service| enables it by
default on clusters running MongoDB 9.0 or later.

When the search process reaches its execution capacity, |service|
queues incoming queries. Queued queries run when capacity frees up, so
they complete successfully but with higher latency than usual. Latency
remains elevated until the arrival rate drops below the rate at which
the process can admit work.

At any time, a query is running in the execution pool, waiting in the
admission control queue, or rejected. Only a full queue causes
rejection.

Search Load Shedding doesn't change how many queries the search
process runs concurrently. It changes only whether the admission
control queue has a capacity limit:

- With an unbounded queue, |service| queues every excess query.
  Queries always run, but sustained overload produces increasing
  latency.

- With a bounded queue, |service| still queues excess queries, but
  only up to a capacity limit. When the queue is full, |service|
  rejects further queries immediately rather than adding latency for
  every client.

|service| sets the size of the execution pool and the capacity of the
bounded queue internally, and can change these limits at any time.

By the time |service| begins rejecting queries, the overload has
already raised latency for the queries that |service| admits.
Rejection sheds the excess load, which prevents that latency from
degrading further. It also keeps the search process responsive instead
of allowing it to fail entirely.

