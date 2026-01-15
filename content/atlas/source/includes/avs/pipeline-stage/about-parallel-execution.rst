.. _vectorSearch-concurrent-queries:

Parallel Query Execution Across Segments 
----------------------------------------

We recommend dedicated :ref:`Search Nodes <configure-search-nodes>`
to isolate vector search query processing. You might see improved query 
performance on the dedicated Search Nodes. Note that the high-CPU systems
might provide more performance improvement. When {+avs+} runs on search
nodes, {+avs+} parallelizes query execution across segments of data. 

Parallelization of query processing improves the response time in many
cases, such as queries on large datasets. Using intra-query parallelism
during {+avs+} query processing utilizes more resources, but improves
latency for each individual query. 

.. note:: 

   {+avs+} doesn't guarantee that each query will run concurrently. For
   example, when too many concurrent queries are queued, {+avs+} might
   fall back to single-threaded execution.

   You might see inconsistent results for the same successive queries.
   To mitigate this, increase the value of ``numCandidates`` in your
   :pipeline:`$vectorSearch` queries.