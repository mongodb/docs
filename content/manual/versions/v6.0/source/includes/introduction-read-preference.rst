Read preference describes how MongoDB clients route read operations to
the members of a :term:`replica set`.

.. include:: /images/replica-set-read-preference.rst

By default, an application directs its read operations to the
:term:`primary` member in a :term:`replica set` (that is, read 
preference mode "primary"). But, clients can specify a read preference
to send read operations to secondaries.
