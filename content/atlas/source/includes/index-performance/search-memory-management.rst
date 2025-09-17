Search Memory Management
````````````````````````

|fts| uses both filesystem cache and JVM heap memory. It stores
various objects like query objects, searcher objects, and other
temporary data used during indexing and search operations in the JVM 
heap to process and track the query. It stores memory mapped
files such as segment files, dictionary files, and the like in the
filesystem cache to enhance its performance, especially when reading
index files. 

In deployments where both the ``mongod`` and ``mongot`` processes run on 
the same node, the memory allocated to the ``mongod`` varies based on
the {+cluster+} tier:  

- For ``M40`` and higher tier {+clusters+}, ``mongod`` dedicates 50% or
  more of the physical RAM for the WiredTiger cache and the remaining memory
  is reserved for in-memory operations, underlying operation systems,
  and other system services.
- For ``M30`` and lower tier {+clusters+}, ``mongod`` dedicates 25% of
  the physical RAM for the WiredTiger cache.

Therefore, the memory allocated to ``mongot`` is a subset of the total
RAM, which can result in resource contention issues between ``mongod``
and ``mongot`` for not only memory, but also for CPU and Disk IO.

In deployments where the ``mongot`` process runs on separate search
nodes, |service| allocates a part of the available RAM to the JVM heap, and uses a small
amount of memory processes like monitoring and
automation, and the rest of the memory is available for search. 

If your search indexes are large and available memory is low, you might
observe performance degradation during indexing and querying due to
insufficient memory. Search indexes might be large if you enable dynamic 
mappings in your index for documents with arbitrary keys. This could
cause :ref:`mapping explosions <index-document-mapping-explosions>`. The
excessive memory consumption by ``mongot`` can also result in ``mongot``
running :abbr:`OOM (Out Of Memory)`, which might also crash ``mongot``. 

You can use the following metrics to determine if ``mongot`` is running
:abbr:`OOM (Out Of Memory)`: 

- An increase in the number of ``Search Page Faults`` and ``Disk IOPS``.
  This happens if   the OS keeps retrieving the required pages from disk
  and reads them into the RAM. 
- Elevated levels of ``Normalized Process/System CPU`` and ``IOWait``,
  which can result in degraded performance.