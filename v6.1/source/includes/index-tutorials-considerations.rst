Applications may encounter reduced performance during index
builds, including limited read/write access to the collection. For
more information on the index build process, see
:ref:`index-operations`, including the 
:ref:`index-operations-replicated-build` section.

Some drivers may specify indexes, using ``NumberLong(1)`` rather than
``1`` as the specification. This does not have any affect on the
resulting index.
