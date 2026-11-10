During index builds, applications may encounter reduced performance or
limited read/write access to the collection being indexed.

For more information on the index build process, see
:ref:`index-operations`, especially the
:ref:`index-operations-replicated-build` section.

Some drivers use ``NumberLong(1)`` instead of ``1`` to specify the index
order. The resulting indexes are the same.
