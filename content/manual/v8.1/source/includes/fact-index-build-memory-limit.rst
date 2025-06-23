Index builds may be initiated either by a user command such as 
:dbcommand:`createIndexes` or by an administrative process such as an
:ref:`initial sync <replica-set-sync>`. Both are subject to the limit 
set by :parameter:`maxIndexBuildMemoryUsageMegabytes`.

An :ref:`initial sync <replica-set-sync>` populates only one collection 
at a time and has no risk of exceeding the memory limit. However, it is 
possible for a user to start index builds on multiple collections in 
multiple databases simultaneously and potentially consume an amount of 
memory greater than the limit set by
:parameter:`maxIndexBuildMemoryUsageMegabytes`.

.. tip::

   To minimize the impact of building an index on replica sets and
   sharded clusters with replica set shards, use a rolling index build
   procedure as described on :ref:`Rolling Index Builds on Replica Sets 
   <index-building-replica-sets>`.
