This tutorial describes how to create a three-member :term:`replica
set` from three existing :binary:`~bin.mongod` instances running with
:doc:`access control </core/authorization>` disabled.

To deploy a replica set with enabled :doc:`access control
</core/authorization>`, see
:ref:`deploy-repl-set-with-auth`. If you wish to deploy a
replica set from a single MongoDB instance, see
:doc:`/tutorial/convert-standalone-to-replica-set`. For more
information on replica set deployments, see the :doc:`/replication` and
:doc:`/core/replica-set-architectures` documentation.

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
