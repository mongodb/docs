.. versionadded:: 3.4
   MongoDB 3.4 adds the ``maxStalenessSeconds`` read preference option
   ``maxStalenessSeconds`` specifies the maximum replication lag, or
   "staleness", that a :term:`secondary` can suffer and still be eligible
   for read operations.
   
.. include:: /includes/fact-important-maxStalenessSeconds-intended-use.rst
