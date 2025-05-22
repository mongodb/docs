Overview
--------

Three member :term:`replica sets <replica set>` provide enough
redundancy to survive most network partitions and other system
failures. These sets also have sufficient capacity for many distributed
read operations. Replica sets should always have an odd number of
members. This ensures that :doc:`elections
</core/replica-set-elections>` will proceed smoothly. For more about
designing replica sets, see :doc:`the Replication overview
</replication>`.
