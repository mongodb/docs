========================
Replication Fundamentals
========================

.. default-domain:: mongodb

This document provides an overview of the core concepts surrounding
MongoDB's replication.

In MongoDB, a ":term:`replica set`" provides a replicated database cluster. Most replica
sets consists of two or more :program:`mongod` instances with at most one
of these designated as the primary node and the rest as secondary
nodes. Clients direct all writes to the primary node, while
the secondary nodes replicate from the primary asynchronously.

Database replication with MongoDB, as with other systems, adds redundancy, helps to
ensure high availability, simplifies certain administrative tasks
such as backups, and may increase read capacity. Most production
deployments are or should use replication.

TODO: "are or should use replication."  are use replication?

If you're familiar with other database systems, you may think about
replica sets as a more sophisticated form of traditional master-slave replication. [#master-slave]_
In master-slave replication, a ":term:`master`" node accepts writes while one or more
":term:`slave`" nodes replicate those write operations and thus
maintain data sets identical to the master. In the context of
a replica set, the node currently accepting write operations is the
"**primary**", and the replicating nodes are "**secondaries**".

MongoDB's replica sets also provide automated failover. If a
:term:`primary` node fails, the remaining members can elect a
new primary node with no administrator intervention.

.. seealso:: ":ref:`Replica Set Implementation Details
   <replica-set-implementation>`" and The ":doc:`/replication`" index
   for a list of all documents in this manual that contain information
   related to the operation and use of MongoDB's replica sets.

.. [#master-slave] MongoDB also provides conventional master/slave
   replication. Master/slave replication operates by way of the same
   mechanism as replica sets, but lacks the automatic failover
   capabilities. While replica sets are the recommended solution for
   production, a replica set can support only 12 nodes in total.
   If your deployment requires more than 11 :term:`slave` nodes, you'll
   need to use master/slave replication.

Member Configurations
---------------------

All replica sets have a single :term:`primary` node and one or more
:term:`secondary` nodes. Replica sets sets allow you to configure
secondary nodes in a variey of ways. This section describes uses and
functions of all the replica set member configurations.

.. seealso:: ":ref:`Replica Set Node Configurations
   <replica-set-node-configurations>`" for instructions on
   configuration your replica sect members.

.. note::

   A replica set can have up to 12 nodes, but only 7 nodes can have
   votes. See ":ref:`non-voting nodes <replica-set-non-voting-members>`"
   for configuration information regarding non-voting nodes.

.. _replica-set-secondary-only-members:

Secondary-Only
~~~~~~~~~~~~~~

All :term:`secondary` members of :term:`replica sets <replica set>`
may become :term:`primary` in the case of a :term:`failover`
situation. If the write and replication traffic associated with
acting as :term:`primary`" would render a member or your application
inoperable due to network or disk configurations, configure this
instance in "secondary-only" mode.

Any node with a :data:`members[n].priority` value equal to ``0``
will never seek election and cannot become primary in any
circumstance. Many users configure all members of their replica sets
that are not located in their main data centers (i.e. the facilities
where the primary application servers are) as "secondary-only" to
prevent these nodes from ever becoming primary.

.. seealso:: ":ref:`Configuring Secondary-Only Members
   <replica-set-secondary-only-members>`" for a procedure that you can
   use to place a member in "secondary-only" mode. See :ref:`replica
   set priorities <replica-set-node-priority>`" for more information
   on member priorities in general.

.. _replica-set-hidden-members:

Hidden
~~~~~~

Hidden members are part of a replica set, but are not only unable to
become primary (i.e. have :ref:`priority <replica-set-node-priority>`
set to a value of ``0``, ) but are also invisible to client
applications.

Hidden members are ideal for instances that will have significantly
different usage patterns than the other nodes and require separation
from normal traffic. Typically hidden members provide reporting,
dedicated backups, and dedicated read-only testing and integration
support.

.. seealso:: ":ref:`Configuring Hidden Members <replica-set-hidden-members>`"

.. _replica-set-delayed-members:

Delayed
~~~~~~~

Delayed members apply operations from the primary's :term:`oplog` with
a specified delay. Delayed members must have a :term:`priority` set to
``0`` to prevent them from becoming primary in their replica sets.

Typically delayed members are useful for preventing and recovering from
various kinds of human error. Such errors may include inadvertently
deleted databases or botched application upgrades. Consider the
following factors when determining the amount of slave delay to
apply:

- Ensure that the length of the delay is equal to or greater than your
  maintenance window.

- The size of the oplog is sufficient to capture *more than* the
  number of operations that typically occur in that period of time.

.. _replica-set-arbiters:

Arbiters
~~~~~~~~

Arbiters are special :program:`mongod` instances that do not hold a
copy of the data and thus cannot become primary. Arbiters exist solely
participate in :term:`elections <election>`.

.. note::

   Because of their minimal system requirements, you may safely deploy an
   arbiter on a system with another work load such as an application
   server or monitoring node.

.. _replica-set-non-voting-members:

Non-Voting
~~~~~~~~~~

You may choose to change the number of votes that each node has in
:term:`elections <election>` for :term:`primary`. In general use, when possible
all nodes should have only 1 vote to prevent intermittent ties,
deadlock, or the wrong nodes from becoming :term:`primary`. Use
":ref:`Replica Set Priorities <replica-set-node-priority>`" to control
which nodes are more likely to become primary.

.. _replica-set-failover:

Failover
--------

Replica sets feature automated failover. If the
:term:`primary` node goes offline or becomes unresponsive and a majority
of the original set members  can still connect to each other, the set will
elect a new primary.

While :term:`failover` is automatic, :term:`replica set <replica set>`
administrators should still understand exactly how this process
works. This section below describe failover in detail.

.. _replica-set-elections:

Elections
~~~~~~~~~

When you initialize a replica set for the first time, and when any
failover occurs, an election takes place to decide which member should
become primary.

Elections provide a mechanism for the members of a :term:`replica set`
to autonomously select a new :term:`primary` node without
administrator intervention. The election allows replica sets to
recover from failover situations very quickly and robustly.

Whenever the primary node becomes unreachable, the secondary nodes
trigger an :ref:`election <replica-set-elections>`. The first node to
receive votes from a majority of the set will become primary. The most
important feature of replica set elections is that a majority of the
original number of nodes in the replica set must be present for
election to succeed. If you have a three-member replica set, the set can
elect a primary when two or three nodes can connect to each other. If
two nodes in the replica go offline, then the remaining node will
remain a secondary.

.. note::

   When an election occurs, the :program:`mongod` instances will close
   all client connections. This ensures that the clients maintain an accurate
   view of the :term:`replica set` and helps prevent :term:`rollbacks <rollback>`.

TODO: it's actually just when a primary steps down that connections are closed.

.. seealso:: ":ref:`Replica Set Election Internals <replica-set-election-internals>`"

.. _replica-set-node-priority:

Node Priority
~~~~~~~~~~~~~

In a replica set, every node has a "priority," that helps
determine eligibility for :ref:`election <replica-set-elections>` to
"primary." By default, all nodes have a priority of ``1``, unless you modify the
:data:`members[n].priority` value. All nodes have a single
vote in :ref:`elections <replica-set-elections>`.

.. warning::

   Always configure the :data:`members[n].priority` value to control
   which nodes will become primary. Do not configure
   :data:`members[n].votes` except to permit more than 7 secondary
   nodes.

.. seealso:: ":ref:`Node Priority Configuration <replica-set-node-priority-configuration>`"

.. _replica-set-consistency:

Consistency
-----------

In MongoDB, all read operations issued to the primary node of a
replica set are :term:`consistent <strict consistency>`, with the last
write operation.

If clients configure the :term:`read preference` to permit allow secondary reads,
read operations cant return from :term:`secondary` nodes that have not
replicated more recent updates or operations. In these situations the
query results may reflect a previous state.

This behavior is sometimes characterized as ":term:`eventual
consistency`" because the secondary node's state will *eventually*
reflect the primary's state and MongoDB cannot guarantee :term:`strict
consistency` for read operations from secondary nodes.

There is no way to guarantee consistency for reads from *secondary
nodes,* except by configuring the :term:`client` and :term:`driver` to
ensure that write operations succeed on all nodes before completing
successfully.

This section provides an overview of the concepts that underpin
database consistency and the mechanisms that MongoDB provides to
ensure that users have access to consistent data states.

.. _replica-set-rollbacks:

Rollbacks
~~~~~~~~~

In some :term:`failover` situations :term:`primary` nodes will have
accepted write operations that have replicated to the
:term:`secondaries <secondary>` after a failover occurs. This case is
rare and typically occurs as a result of a network partition with
replication lag. When this node (the former primary) rejoins the
:term:`replica set` and attempts to continue replication as a
secondary those operations the former primary must revert these
operations or "rolled back" these operations to maintain database
consistency across the replica set.

TODO: ":term:`primary` nodes will have
accepted write operations that have replicated to the
:term:`secondaries <secondary>`" -> have not replicated to the secondary

TODO: "as a
secondary those operations the former primary must revert these
operations or" those operations...these operations

MongoDB writes the rollback data to a :term:`BSON` file in the
database's :setting:`dbpath` directory. Use :doc:`bsondump
</reference/bsondump>` to read the contents of these rollback files
and then manually apply the changes to the new primary. There is no
way for MongoDB to appropriately and fairly handle rollback situations
without manual intervention. Since rollback situations require an
administrator's direct intervention, users should strive to avoid
rollbacks as much as possible. Until an administrator applies this
rollback data, the former primary remains in a "rollback" status.

TODO: "Until an administrator applies this
rollback data, the former primary remains in a "rollback" status." Untrue!  ROLLBACK state should automatically correct itself and the server will end up in SECONDARY state.

The best strategy for avoiding all rollbacks is to ensure :ref:`write
propagation <replica-set-write-concern>` to all or some of the
nodes in the set. Using these kinds of policies prevents situations
that might create rollbacks.

.. warning::

   A :program:`mongod` instance will not rollback more than 300
   megabytes of data. If your system needs to rollback more than 300
   MB, you will need to manually intervene to recover this data.

.. note::

   After a rollback occurs, the former primary will remain in a
   "rollback" mode until the administrator deals with the rolled back
   data and restarts the :program:`mongod` instance. Only then can the
   node becomes a normal :term:`secondary` terms.

TODO: not true...

Application Concerns
~~~~~~~~~~~~~~~~~~~~

For the most part, client applications are indifferent to the
operation of replica sets, and whether a MongoDB instance is a single
server (i.e. "standalone") or a replica set is largely
irrelevant. While specific configuration depends to some extent on the
client :doc:`drivers </applications/drivers>`, there is often minimal
or no differences between applications running with :term:`replica
sets <replica set>` or standalone instances.

There are two major concepts that *are* important to consider when
working with replica sets:

1. :ref:`Write Concern <replica-set-write-concern>`.

   By default, MongoDB clients receive no response from the server to
   confirm successful write operations. Most drivers provide a
   configurable "safe mode," where the server will return a response
   for all write operations using :dbcommand:`getLastError`. For
   replica sets, :term:`write concern` is configurable to ensure that
   secondary members of the set have replicated operations before the
   write returns.

2. :ref:`Read Preference <replica-set-read-preference>`

   By default, read operations issued against a replica set return
   results from the :term:`primary`. Users may
   configure :term:`read preference` on a per-connection basis to
   prefer that read operations return on the :term:`secondary`
   members.

:term:`Read preference` and :term:`write concern` have particular
:ref:`consistency <replica-set-consistency>` implications.

.. seealso:: ":doc:`/applications/replication`,"
   ":ref:`replica-set-write-concern`," and
   ":ref:`replica-set-read-preference`."

Administration and Operations
-----------------------------

This section provides a brief overview of relevant concerns for
administrators of replica set deployments.

.. seealso::

   - ":doc:`/administration/replica-sets`"
   - ":doc:`/administration/replication-architectures`"

.. _replica-set-oplog-sizing:

Oplog
~~~~~

The operation log (i.e. :term:`oplog`) is a :term:`capped collection`
that stores all operations that modify the data stored in MongoDB. All
members of the replica set maintain oplogs that allow them to maintain
the current state of the database. In most cases the default oplog
size, which is 5% of total disk size, [#default-oplog]_ is an
acceptable size.

Theoretically, if an oplog that is 5% of the total disk space fits 24
hours of operations, then nodes can stop copying entries from the
oplog for 24 hours before they require full resyncing *and* the disk
will be full in 19 days. If this were the case, you would have a very
high-volume node: in many circumstances, a default oplog can hold
days of operations. However, there are some factors that affect oplog
space utilization.

However, consider the following factors:

- If you delete roughly the same amount of data as you insert.

  In this situation the database will not grow significantly in disk
  utilization, but the size of the operation log can be quite large.

- If a significant portion of your workload entails in-place updates.

  In-place updates create a large number of operations but do not
  change the quantity data on disk.

- Update operations that affect multiple documents at once.

  The oplog must translate multi-updates into individual operations,
  in order to maintain idempotency. This can use a great deal of
  operation-log space without a corresponding increase in disk
  utilization.

If you can predict that your replica set's workload will resemble one
of the above patterns, then you may want to consider creating an oplog
that's larger than the default. Conversely, if the predominance of
activity of on your MongoDB-based application are reads and you are
writing a small amount of data, you may find that you need a much
smaller oplog.

.. note::

   Once created, you cannot change the size of the oplog without using
   the :ref:`oplog rezising procedure
   <replica-set-procedure-change-oplog-size>` outlined in the
   ":doc:`/tutorial/change-oplog-size`" guide.

.. [#default-oplog] The default oplog size is the *greater* of 1
   gigabyte or 5% of total disk size.

Deployment
~~~~~~~~~~

Without replication, a standalone MongoDB instance represents a single
point of failure and any disruption of the MongoDB system will render
the database unusable and potentially unrecoverable. Not only does
replication increase the reliability of the database instance, but
replica sets are capable of distributing reads to :term:`secondary`
nodes depending on :term:`read preference`. Particularly for database
work loads dominated by read operations, (i.e. "read heavy") replica
sets can greatly increase the capability of the database system.

The minimum requirements for a replica set include two nodes with
data, for a :term:`primary` and a secondary, and an :ref:`arbiters
<replica-set-arbiters>`. In most circumstances, however, you will want
to deploy three data nodes.

For those deployments that rely heavily on distributing reads to
secondary instances, add additional nodes to the set as load increases
to provide additional resources. Also as your deployment grows,
consider adding or moving replica set members to secondary data
centers or to geographically distinct locations for additional
redundancy. While many architectures are possible, always ensure that
the quorum of nodes required to elect a primary remains in your main
facility.

Depending on your operational requirements, you may consider adding
nodes configured for a specific purpose including, a :term:`delayed
member` to help provide protection against human errors and change
control, a :term:`hidden member` to provide an isolated node for
reporting and monitoring, and/or a :ref:`secondary only member
<replica-set-secondary-only-members>` for dedicated backups.

The process of establishing a new replica set member can be resource
intensive on existing nodes. As a result, deploy new members to
existing replica sets significantly before current demand saturates
the existing members.

.. note::

   :term:`Journaling <journal>`, provides single-instance
   write durability. The journaling greatly improves the reliability
   and durability of a database. Unless MongoDB runs with journaling, when a
   MongoDB instance terminates ungracefully, the database can loose up to 60 seconds of data,
   and the database may remain in an inconsistent state and
   unrecoverable state.

TODO: this isn't true.  If you are running w/out journaling and mongod terminates "ungracefully" you can lose _all_ data.  Also, you should assume, after a crash w/out journaling, that the db is in an inconsistent (i.e., corrupt) state.

   **Use journaling**, however, do not forego proper replication
   because of journaling.

   64-bit versions of MongoDB after version 2.0 have journaling
   enabled by default.

Security
~~~~~~~~

In most cases, :term:`replica set` administrators do not have to keep
additional considerations in mind beyond the normal security
precautions that all MongoDB administrators must take. However, ensure
that:

- Your network configuration will allow every member of the replica
  set to contact every other member of the replica set.

- If you use MongoDB's authentication system to limit access to your
  infrastructure, ensure that you configure a
  :setting:`keyFile` on all nodes to permit authentication.

.. seealso:: ":ref:`Replica Set Security <replica-set-security>`"

.. _replica-set-deployment-overview:
.. _replica-set-architecture:

Architectures
~~~~~~~~~~~~~

The architecture and design of the replica set deployment can have a
great impact on the set's capacity and capability. This section
provides a general overview of best practices for replica set
architectures.

This document provides an overview of the *complete* functionality of
replica sets, which highlights the flexibility of the replica set and
its configuration. However, for most production deployments a
conventional 3-member replica set with :data:`members[n].priority`
values of ``1`` are sufficient.

While the additional flexibility discussed is below helpful for
managing a variety of operational complexities, it always makes sense
to let those complex requirements dictate complex architectures,
rather than add unnecessary complexity to your deployment.

Consider the following factors when developing an architecture for
your replica set:

- Ensure that the members of the replica set will always be able to
  elect a primary node. Run an odd number of nodes or run an arbiter
  on one of your application servers if you have an even number of
  members.

- With geographically distributed nodes, be aware of where the
  "quorum" of nodes will be in case of likely network partitions,
  attempt to ensure that the set can elect a primary among the nodes in
  the primary data center.

- Consider including a :ref:`hidden <replica-set-hidden-members>`
  or :ref:`delayed member <replica-set-delayed-members>` in your replica
  set to support dedicated functionality, like backups, reporting, and
  testing.

- Consider keeping one or two members of the set in an off-site data
  center, but make sure to configure the :ref:`priority
  <replica-set-node-priority>` to prevent it from
  becoming :term:`primary`.

.. seealso:: ":doc:`/administration/replication-architectures`" for
   more information regarding replica set architectures.
