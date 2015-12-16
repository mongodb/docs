Read preference describes how MongoDB clients route read operations to
the members of a :term:`replica set`.

.. include:: /images/replica-set-read-preference.rst

By default, an application directs its read operations to the
:term:`primary` member in a :term:`replica set`. In a replica set with
one primary member [#edge-cases-2-primaries], reads from the primary
reflect the latest version of a document in absence of a failover.

You can improve read throughput or reduce latency by distributing some
or all reads to secondary members of the replica set.
