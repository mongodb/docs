Eventual Consistency and Indexing Latency 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

|fts| supports eventual consistency and does not provide any stronger 
consistency guarantees. This means that data inserted into a MongoDB 
collection and indexed by |fts| will not be available immediately for 
``$search`` queries.

|fts| reads data from MongoDB :manual:`change streams </changeStreams/>` and indexes that
data in an asynchronous process. This process is typically very fast, but might sometimes
be impacted by replication latency, system resource availability, and index definition
complexity. A large number of |fts| indexes might also contribute to replication lag and
latency for |fts| indexes. 

.. include:: /includes/search-shared/fact-partial-indexing-performance-considerations.rst