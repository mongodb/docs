If your collection holds a large amount of data, and your application
needs to be able to access the data while building the index, consider
building the index in the background, as described in
:ref:`index-creation-background`.

.. include:: /includes/note-build-indexes-on-replica-sets.rst

Some drivers may specify indexes, using ``NumberLong(1)`` rather than
``1`` as the specification. This does not have any affect on the
resulting index.
