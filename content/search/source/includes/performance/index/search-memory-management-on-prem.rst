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
the hardware.  

The memory allocated to ``mongot`` is a subset of the total
RAM, which can result in resource contention issues between ``mongod``
and ``mongot`` for not only memory, but also for CPU and Disk IO.
For guidance, see :ref:`mongot-sizing-hardware`.

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