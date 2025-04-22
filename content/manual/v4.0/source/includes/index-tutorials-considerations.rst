If your collection holds a large amount of data, and your application
needs to be able to access the data while building the index, consider
building the index in the background, as described in
:ref:`index-creation-background`.

For more information on the index build process, see
:ref:`index-operations`, including the
:ref:`index-operations-replicated-build` section.

Some drivers may specify indexes, using ``NumberLong(1)`` rather than
``1`` as the specification. This does not have any affect on the
resulting index.
