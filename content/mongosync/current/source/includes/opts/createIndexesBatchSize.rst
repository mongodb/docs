.. versionadded:: 1.19.0

*Type*: integer

*Minimum*: ``1``

*Maximum*: ``64``

Set the batch size for index builds on destination clusters.
By default, ``mongosync`` programmatically optimizes this value on
Atlas destination clusters. On non-Atlas destination clusters, the
default batch size is ``2``.

``mongosync`` groups indexes into batches and issues one
``createIndexes`` command per batch. Each batch contains indexes for a
single collection, so a collection with more indexes than the batch size
requires multiple batches.


.. warning::

   Ensure that you have allocated 100 MB-1 GB of memory per index. Additionally,
   ensure that the total memory used by concurrent index builds remains under 20%
   of the destination cluster's RAM. Allocating more than 20% of the destination
   RAM for index builds can interfere with the filesystem cache, reducing memory
   available for buffering writes to the destination cluster.


For more information, see :ref:`mongosync-index-build-optimizations`.