Read preference describes how MongoDB clients route read operations to
the members of a :term:`replica set`.

.. include:: /images/replica-set-read-preference.rst

By default, an application directs its read operations to the
:term:`primary` member in a :term:`replica set`. Because write
operations are issued to the single primary, reading from the primary
returns the latest version of a document [#edge-cases-2-primaries]_.

For an application that does not require fully up-to-date data, you can
improve read throughput or reduce latency by distributing some or all
reads to secondary members of the replica set.
