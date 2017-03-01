.. For any pipeline stage that has a memory limit, the operation
   will produce an error if exceeds its memory limit. Currently, only
   $sort and $group have a limit.

.. FYI -- 2.5.3 introduced the limit to $group and changed the limit for
   $sort from 10% to 100 MB.

.. versionchanged:: 2.6

Pipeline stages have a limit of 100 megabytes of RAM. If a stage
exceeds this limit, MongoDB will produce an error. To allow for the
handling of large datasets, use the ``allowDiskUse`` option to enable
aggregation pipeline stages to write data to temporary files.

.. versionchanged:: 3.4

.. include:: /includes/fact-graphlookup-memory-restrictions.rst

.. seealso:: :ref:`sort-memory-limit` and :ref:`group-memory-limit`.
