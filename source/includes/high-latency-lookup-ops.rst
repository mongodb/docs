High-Latency $lookup Operations 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Some high-latency :pipeline:`$lookup` operations don't generate a slow 
query log for the foreign collection. This can occur because slow query 
logs correspond with operations that are reported in the 
:ref:`Query Profiler <query-profiler>`, whereas latency metrics increment 
only when a :ref:`collection lock <faq-concurrency-locking>` is acquired. 

If the ``$lookup`` query on a shard can perform a local read, the ``$lookup`` 
doesn't record a separate operation for querying the foreign collection. A 
local read refers to when the query on the foreign collection targets only the 
same shard where the current operation is being executed. As a result, the 
``$lookup`` operation increases the Namespace Insights latency metrics and 
operation counts, but does not generate a slow query log for the foreign 
collection.