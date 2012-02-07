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
   votes. See ":ref:`non-voting nodes <replica-set-non-voting-nodes>`"
   for configuration information regarding non-voting nodes.

Secondary-Only
~~~~~~~~~~~~~~

TODO increase concision

Any node with a :js:data:`members[n].priority` value greater than ``0``
may become primary given the proper network and environmental
circumstances. If the write and replication traffic associated with
acting as "primary," would render a node or your application
inoperable due to network or disk configurations, set the priority to
``0`` to create a secondary only node.

Replica sets preferentially elect and maintain the primary status of
the node with the highest ``priority`` setting. Within a replica set,
you can set some members to have priorities that are higher to increase the
chance that these instances will become primary and some nodes to values to
lower values to ensure that they'll become primary if no
other node is eligible. See :ref:`replica set priorities
<replica-set-node-priority>`" for more information.

Secondary-only nodes are useful if some nodes use harder that's is
less efficient for writes and therefore less suited to becoming
primary. Additionally you can maintain nodes in your main data center
with a higher priority than nodes in a backup facility, to prevent
"off-site" databases from becoming master except in dire situations.

.. seealso:: ":ref:`Configuring Secondary-Only Nodes <replica-set-secondary-only-nodes>`."

Hidden
~~~~~~

Hidden nodes are members of a replica set that are not only unable to
become primary (i.e. have :ref:`priority
<replica-set-node-priority>` set to a value of ``0``, ) but are also
invisible to client applications.

Hidden nodes are ideal for instances that will have significantly
different usage patterns than the other nodes and require separation
from normal traffic. Often nodes for reporting, dedicated
backups, and testing/integration need to operate as hidden needs.

.. seealso:: ":ref:`Configuring Hidden Nodes <replica-set-hidden-nodes>`"

Delayed
~~~~~~~

Delayed members apply operations from the primary's :term:`oplog` with a specified
delay. Delayed members  must have a :term:`priority` set to ``0`` to prevent them from
becoming primary in their replica sets.

Typically delayed members are useful for preventing and recovering from
various kinds of human error. Such errors may include inadvertently
deleted databases or botched application upgrades. Consider the
following factors when determining the amount of slave delay to
apply:

- Ensure that the length of the delay is equal to or greater than your
  maintenance window.

- The size of the oplog is sufficient to capture *more than* the
  number of operations that typically occur in that period of time.

Arbiters
~~~~~~~~

Arbiters are special :program:`mongod` instances that do not hold a
copy of the data and thus cannot become primary. Arbiters exist solely
participate in :term:`elections <election>`.

.. note::

   Because of their minimal system requirements, you may safely deploy an
   arbiter on a system with another work load such as an application
   server or monitoring node.

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

Elections provide a mechanism for the members of a :term:`replica set`
to autonomously select a new :term:`primary` node without
administrator intervention. The election allows replica sets to
recover from failover situations very quickly and robustly. 

Whenever the primary node becomes unreachable, the secondary nodes
trigger an :ref:`election <replica-set-elections>`. The first node to
receive votes from a majority of the set will become primary. The most
important feature of replica set elections is that a majority of the
original number of nodes in the replica set must be present for
election to succeed. If you have a three-node replica set, the set can
elect a primary when two or three nodes can connect to each other. If
two nodes in the replica go offline, then the remaining node will
remain a secondary.

.. note::

   When an election occurs, the :program:`mongod` instances will close
   all client connections. This ensures that the clients maintain an accurate
   view of the :term:`replica set` and helps prevent :term:`rollbacks <rollback>`.

.. seealso:: ":ref:`Replica Set Election Internals <replica-set-election-internals>`"

.. _replica-set-node-priority:

Node Priority
~~~~~~~~~~~~~

In a replica set, every node has a "priority," that helps
determine eligibility for :ref:`election <replica-set-elections>` to
"primary." By default, all nodes have a priority of ``1``, unless you modify the
:js:data:`members[n].priority` value. All nodes have a single
vote in :ref:`elections <replica-set-elections>`.

.. warning::

   Always configure the :js:data:`members[n].priority` value to control
   which nodes will become primary. Do not configure
   :js:data:`members[n].votes` except to permit more than 7 secondary
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

MongoDB writes the rollback data to a :term:`BSON` file in the
database's :setting:`dbpath` directory. Use :doc:`bsondump
</reference/bsondump>` to read the contents of these rollback files
and then manually apply the changes to the new primary. There is no
way for MongoDB to appropriately and fairly handle rollback situations
without manual intervention. Since rollback situations require an
administrator's direct intervention, users should strive to avoid
rollbacks as much as possible. Until an administrator applies this
rollback data, the former primary remains in a "rollback" status.

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
   data and restarts the :program:`mongod` instance. Only thenn can the
   node becomes a normal :term:`secondary` terms.

Application Concerns
~~~~~~~~~~~~~~~~~~~~

TODO write about application operations

.. seealso:: ":doc:`/applications/replication`,"
   ":ref:`replica-set-write-concern`," and
   "ref:`replica-set-read-preference`."

Administration and Operations
-----------------------------

This section provides a brief overview of relevant concerns for
administrators of replica set deployments.

.. seealso::

   - ":doc:`/administration/replica-sets`"
   - ":doc:`/administration/replication-architectures`"

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
node` to help provide protection against human errors and change
control, a :term:`hidden node` to provide an isolated node for
reporting and monitoring, and/or a :ref:`secondary only node
<replica-set-secondary-only-nodes>` for dedicated backups.

The process of establishing a new replica set member can be resource
intensive on existing nodes. As a result, deploy new members to
existing replica sets significantly before current demand saturates
the existing members.

.. note::

   :term:`Journaling`, provides single-instance
   write durability. The journaling greatly improves the reliability
   and durability of a database. Unless MongoDB runs with journaling, when a
   MongoDB instance terminates ungracefully, the database can loose up to 60 seconds of data,
   and the database may remain in an inconsistent state and
   unrecoverable state.

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
conventional 3-node replica set with :js:data:`members[n].priority`
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

- Consider including a :ref:`hidden <replica-set-hidden-nodes>`
  or :ref:`delayed node <replica-set-delayed-nodes>` in your replica
  set to support dedicated functionality, like backups, reporting, and
  testing.

- Consider keeping one or two members of the set in an off-site data
  center, but make sure to configure the :ref:`priority
  <replica-set-node-priority>` to prevent it from
  becoming :term:`primary`.

.. seealso:: ":doc:`/administration/replication-architectures`" for
   more information regarding replica set architectures.
