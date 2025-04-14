Foreground index builds may be initiated either by a user command
such as :doc:`Create Index </reference/method/db.collection.createIndex/>`
or by an administrative process such as an
:doc:`initial sync </core/replica-set-sync>`.
Both are subject to the limit set by
:parameter:`maxIndexBuildMemoryUsageMegabytes`.

An :doc:`initial sync operation </core/replica-set-sync>` populates
only one collection at a time and has no risk of exceeding the memory
limit. However, it is possible for a user to start foreground index
builds on multiple collections in multiple databases simultaneously
and potentially consume an amount of memory greater than the limit
set in :parameter:`maxIndexBuildMemoryUsageMegabytes`.

.. tip::

   To minimize the impact of building an index on replica sets and
   sharded clusters with replica set shards, use a rolling index build
   procedure as described on
   :doc:`/tutorial/build-indexes-on-replica-sets`.
