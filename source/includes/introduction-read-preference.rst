Read preference describes how MongoDB clients route read operations to
members of a :term:`replica set`.

By default, an application directs its read operations to the
:term:`primary` member in a :term:`replica set`. Reading from the
primary guarantees that read operations reflect the latest version of a
document. However, by distributing some or all reads to secondary
members of the replica set, you can improve read throughput or reduce
latency for an application that does not require fully up-to-date data.
