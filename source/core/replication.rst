========================
Replication Fundamentals
========================

This document provides an overview of the core concepts that underpin
MongoDB's replication functionality, known as ":term:`replica sets
<replica set>`." In these configurations, multiple :option:`mongod`
run and maintain the same set of data in parallel. Having multiple
copies of a database updated at the same time, adds redundancy,
increases "read capacity," and increases the availability of a
database in the case of issues with one or more nodes.

.. seealso:: The ":doc:`/replication`" document for a list of all
   documents in this resource that information on the operation and
   use of MongoDB's replica sets.

Overview
--------

Fundamentally, MongoDB provides "master/slave," replication where one,
"*master*," node accepts write operations while one or more "*slave*"
nodes mirror or replicate all write operations and thus maintain
data sets that are identical to the master.

MongoDB's "replica set" [#master-slave]_ functionality provides an
additional convince, by allowing members of a replica set to
independently select a node to serve as the master and then later
automatically failover when necessary in response to the status of the
environment. In the context of a replica set node currently accepting
write operations is referred to as "**primary**", while all other
nodes are refereed to as  "**secondary**.".

Replication works, by way of a special :term:`capped collection`
called the :term:`oplog` that keeps a record of all operations applied
to the master node. Secondary nodes then replicate both this log and
then apply the operations to their data collections. This replication
process results in all nodes maintaining identical and up to date
copies of the same data set. All nodes send heartbeats to other nodes,
and will pull operations from the node with the lowest "ping" time.

If the primary node becomes unreachable, an :ref:`election
<replica-set-elections>` is triggered and a new primary node is
elected from among the secondaries and the cluster continues to
operate normally. In the mean time, the primary that has lost contact
with the rest of the set will "step down" and become a secondary,
forcing an election. See the ":ref:`replica set failover
<replica-set-failover>`" section for more on this process.

MongoDB uses :term:`single master replication` to ensure that the
database remains consistent. However, it's possible to modify the
:ref:`read preferences <replica-set-read-preference>` so that read
operations can be distributed to the secondary nodes. For deployments
with high levels of "read" activity, distributing reads to secondary
can provide a great deal of additional capacity. Since secondary nodes
are always *approaching* the state of the primary, but may trail
behind the primary by some value, you may need to account for these
potential discrepancies in your application layer.

.. note::

   Use :js:func:`db.getReplicationInfo()` from a secondary node
   and the ":doc:`replication information </reference/replication-info>`
   output to asses the current state of replication, and determine if
   there is any unintended replication delay.

In the default configuration, all have nodes an equal chance of
becoming primary; however, it's possible to set "priorities" that
weight the election. In some architectures, there may be operational
reasons to decrease the likelihood of a specific replica set member or
members from becoming primary: If the node is located in a remote data
center or runs on a different hardware platform. See: ":ref:`node
priority <replica-set-node-priority>`" for more information.

Replica sets can also include a number of node configurations on-top
of primary and secondary types. These node configurations, briefly:

- :ref:`secondary-only <replica-set-secondary-only-nodes>` nodes have
  their "priority" set to a low value or 0 to make it difficult or
  impossible for the replica set to elect them as primary nodes.

- :ref:`hidden <replica-set-hidden-nodes>` nodes that are hidden from
  all clients to prevent all non-prmiary queries from reaching these
  instances.

- :ref:`delayed <replica-set-delayed-nodes>` nodes that intentionally
  maintain a state that "lags" a fixed period of time behind the
  current state of the primary node. These nodes are typically used to
  maintain a rolling backup of the state of a database.

- :ref:`arbiters <replica-set-arbiters>` are nodes that do not
  hold a copy of the data, but are used to break ties in elections.

In almost every case, replica sets simplify the process of
administering database replication; however, replica sets still have a
unique set of administrative requirements and concerns. Choosing the
right :doc:`system architecture
</administration/replication-architectures>` for data your set is
crucial. Administrators of replica sets also have unique
:ref:`monitoring <replica-set-monitoring>`, and :ref:`security
<replica-set-security>` concerns. The :ref:`replica set functions
<replica-set-functions>` in the :option:`mongo` shell, provide the
tools necessary for replica set administration. In particular use the
:js:func:`rs.conf()` to return a :term:`JSON document` holding the
complete configuration of the current, and :js:func:`rs.reconfig()` to
modify the configuration of an existing replica set.

.. [#master-slave] MongoDB provides "conventional" master/slave
   replication, in addition to :term:`replica sets <replica
   set>`. While replica sets are the recommended solution for
   production replication, a replica set can only support 12 total
   nodes. If your requires deployment more than 11 :term:`slave`, you
   will need to use master/slave replication.

.. _replica-set-node-configurations:

Node Configurations
-------------------

All replica sets have a single primary node and one or more secondary
nodes. In most deployments all of the secondary nodes are roughly
equivalent to each other and to the primary node. The replica set
functionality provides the ability to configure several other types of
secondary nodes for specific purposes. This section provides a brief
overview of the major *types* of nodes that may be a part of a replica
set.

Nodes can be configured either when a node is added to a replica set
with the :js:func:`rs.add()` function, or during regular operation
using the :js:func:`rs.reconfig()` function. Use :js:func:`rs.conf()`
to retrieve the current replica set configuration.

A replica set can have up to 12 nodes, but only 7 nodes can have
votes. See ":ref:`non-voting nodes <replica-set-non-voting-nodes>`"
for more information.

.. note::

   The :js:func:`rs.reconfig()` shell command can force the
   current primary to step down and causes an election. When the
   primary node steps down, all clients will disconnect. Do not be
   alarmed. While, this typically takes 10-20 seconds, attempt to make
   these changes during scheduled maintenance periods.

.. _replica-set-secondary-only-nodes:

Secondary-Only Nodes
~~~~~~~~~~~~~~~~~~~~

Replica sets will preferentially elect and maintain the primary status
of the node with the highest ``priority`` setting. Within a replica
set, you can set some nodes with priorities to higher values increase
the chances that they'll be elected primary, and some nodes to values
to lower values to ensure that they'll only be elected to primary if
no other node is eligible. See :ref:`replica set priorities
<replica-set-node-priority>`" for more information.

Any node with a :js:data:`members.priority` value greater than ``0``
may become primary given the proper network and environmental
circumstances. If the write and replication traffic associated with
acting as "primary," would render a node or your application
inoperable due to network or disk configurations, set the priority to
``0`` to create a secondary only node.

Given a three node replica set, with member "``_id``" values of:
``0``, ``1``, and ``2``, use the following sequence of operations in
the :option:`mongo` shell to modify node priorities:

.. code-block:: javascript

   cfg = rs.conf()
   cfg.members[0].priority = 0
   cfg.members[1].priority = 0.5
   cfg.members[2].priority = 1
   cfg.members[3].priority = 2
   rs.reconfig(cfg)

Here, the member ``0`` is set to ``0`` and cannot become
primary. Member ``3`` has a priority of ``2`` and will become primary,
if eligible, under most circumstances. Member ``2`` has a priority of
``1``, and will become primary if no node with a higher priority is
eligible to be primary. Since all additional nodes in the set will
also have a priority of ``1`` by default, member ``2`` and all
additional nodes will be equally likely to become primary if higher
priority nodes are not accessible. Finally, member ``1`` has a
priority of ``0.5``, which makes it less likely to become primary than
all other nodes but doesn't prohibit the possibility.

.. note::

   If your replica set has an even number members, add an
   :ref:`arbiter <replica-set-arbiters>` to ensure that
   nodes wil be able to quickly obtain a majority of votes in an
   :ref:`election <replica-set-elections>` for primary.

Secondary-only nodes are useful if some nodes use harder that's is
less efficient for writes and therefore less suited to becoming
primary. Additionally you can maintain nodes in your main data center
with a higher priority than nodes in a backup facility, to prevent
"off-site" databases from becoming master except in dire situations.

.. seealso:: ":js:data:`members.priority`" and ":ref:`Replica Set
   Reconfiguration <replica-set-reconfiguration-usage>`."

.. _replica-set-hidden-nodes:

Hidden Nodes
~~~~~~~~~~~~

Hidden nodes are members of a replica set that are not only unable to
be elected primary (i.e. have :ref:`priority
<replica-set-node-priority>` set to a value of ``0``, ) but are also
able to avoid all normal "non-primary," queries.

.. seealso:: ":ref:`Replica Set Read Preference <replica-set-read-preference>`."

To configure a node as hidden, use the following sequence of
operations in the :option:`mongo` shell:

.. code-block:: javascript

   cfg = rs.conf()
   cfg.members[0].priority = 0
   cfg.members[0].hidden = true
   rs.reconfig(cfg)

After the set is reconfigured, the node with the "``_id``" of ``0``,
has a priority of ``0`` so that it cannot become master, and the other
nodes in the set will not advertise the hidden node in the
:mongodb:command:`isMaster` output.

Hidden nodes are ideal for instances that will have significantly
different usage patterns than the other nodes, and need to be
separated from normal traffic. Often nodes for reporting, dedicated
backups, and testing/integration need to operate as hidden needs.

.. seealso:: ":js:data:`members.hidden`,"
   ":js:data:`members.priority`," and ":ref:`Replica Set
   Reconfiguration <replica-set-reconfiguration-usage>`."

.. _replica-set-delayed-nodes:

Delayed Nodes
~~~~~~~~~~~~~

Delayed nodes apply operations from the :term:`oplog` with a specified
delay, so that the node will always "lag" a certain period behind the
latest operations in the :term:`primary` node's oplog. Delayed nodes
must have a :term:`priority` set to ``0`` to prevent them from
becoming primary in their replica sets.

To configure a node to delay one hour behind the current time in the
oplog, use the following sequence of operations in the :option:`mongo`
shell:

.. code-block:: javascript

   cfg = rs.conf()
   cfg.members[0].priority = 0
   cfg.members[0].slaveDelay = 3600
   rs.reconfig(cfg)

After the set is reconfigured, the node with the "``_id``" of ``0``,
has a priority of ``0`` so that it cannot become master and will delay
replication by 3600 seconds, or 1 hour.

Typically delayed nodes useful for preventing or recovering from
various kinds of human error, such as an inadvertently deleted
database or a botched application upgrade. Consider the following
parameters when determinging the amount of slave delay to configure:

- Ensure that the length of the delay is equal to or greater than
  your maintenance window.

- The size of the oplog is sufficient to capture *more than* the
  number of operations that typically occur in that period of time.

.. seealso:: ":js:data:`members.slaveDelay`" and ":ref:`Replica Set
   Reconfiguration <replica-set-reconfiguration-usage>`."

.. _replica-set-arbiters:

Arbiters
~~~~~~~~

Arbiters are special :option:`mongod` instances that do not hold a
copy of the data (and thus cannot become primary,) but participate in
elections to determine which node will become primary. Arbiters
require very few resources and help prevent deadlocks in replica set
elections that have an even number of members.

.. note::

   Because of the minimal system requirements You may safely deploy an
   arbiter on a system with another work load such as an application
   server or monitoring node.

   While one Arbiter node is useful for breaking ties, there
   are no benefits to deploying multiple Arbiter nodes, and this is
   typically counter-indicated.

Use the following command to start an arbiter: ::

     mongod --replSet [setname]

Replace "``[setname]``" with the name of the replica set that the
arbiter will join. Then in the :option:`mongo` shell, while connected
to the *current primary* node, issue the following command:

.. code-block:: javascript

   rs.addArb("[hostname]:[port]")

Replace the "``"[hostname]:[port]"``" string with the name of the
hostname and port of the arbiter that you wish to add to the set.

.. seealso:: ":mongodb:setting:`replSet`," ":option:`mongod
   --replSet`, and ":js:func:`rs.addArb()`."

.. _replica-set-non-voting-nodes:

Non-Voting Nodes
~~~~~~~~~~~~~~~~

A replica set can have up to 12 nodes that have copies of the data,
but only 7 nodes can have votes at once. To disable a node's ability
to vote in :ref:`elections <replica-set-elections>` use the following
command sequence in the :option:`mongo` shell.

.. code-block:: javascript

   cfg = rs.conf()
   cfg.members[3].votes = 0
   cfg.members[4].votes = 0
   cfg.members[5].votes = 0
   rs.reconfig(cfg)

This sequence sets gives ``0`` votes to set members with the ``_id``
values of ``3``, ``4``, and ``5``, which allows them to be elected
primary, but does not allow them to vote in elections and allows you
to add three additional voting nodes to your set. Ensure that your
voting nodes are located so that your designated primary node or nodes
can reach a majority of votes in the event of a network partition.

.. note::

   In general use, when possible all nodes should have only 1
   vote to prevent intermittent ties, deadlock, or the wrong nodes
   from becoming :term:`primary`. Use ":ref:`Replica Set Priorities
   <replica-set-node-priority>`" to control which nodes are more
   likely to be elected primary rather than vote weighting.

.. seealso:: ":js:data:`members.votes`" and ":ref:`Replica Set
   Reconfiguration <replica-set-reconfiguration-usage>`."

.. _replica-set-failover:

Failover
--------

When the current :term:`primary` cannot function as the primary, the
replica set "fails over" and elects another node to act as
primary. While :term:`failover` is a largely automated process, users
who deploy applications that use :term:`replica sets <replica set>`
ought to understand the operation of and processes used during
failover.

.. _replica-set-elections:

Elections
~~~~~~~~~

Elections are the process by which the members of a replica set select
the primary node in a cluster. Elections are triggered by a primary
node that "steps down," or by a secondary node that cannot see a
primary node. All members have one vote in an election, and every node
can veto an election. A single node's veto will invalidate the
election.

An existing primary will step down in response to the
:mongodb:command:`replSetStepDown` command, or if it sees that one of
the current secondaries is eligible for election *and* has a higher
priority. A secondary node will call for an election if it cannot
establish a connection to a primary node. Primary nodes will also step
down when it cannot contact a majority of the members of the replica
set.

In an election, every member, including :ref:`hidden
<replica-set-hidden-nodes>`, :ref:`arbiters
<replica-set-arbiters>`, and :ref:`delayed
<replica-set-delayed-nodes>` get a single vote. Members will give
votes to every eligible node that calls an election, unless the node
that's calling the election is ineligible for some reason.

A node will veto an election under the following conditions:

- If the node seeking an election is not a member of the voter's set.

- If the node seeking an election is more than 10 seconds behind the
  most recent operation to the replica set.

- If the voter is connected to a different node with a higher priority
  than the node seeking election that is also eligible for election.

- If the voter knows that the current primary has more recent
  operations (i.e. a higher "optime") than then node seeking
  election.

- The current primary will also veto an election if it has the same or
  more recent operations (i.e. a higher or "equal optime") than the
  node seeking election.

The first node to receive votes from a majority of members in a set
will become the next primary until another election is caused. Be
aware of the following conditions and possible situations:

- Replica sets send heartbeats (pings) to each other every 2
  seconds. If a heartbeat does not return for more than 10 seconds,
  the delinquent node is marked as inaccessible.

- Replica set priorities are just used in comparison with other
  nodes. The absolute value of priorities does not have any impact on
  the outcome of replica set elections.

  .. note::

     The only exception is that nodes with a priority of ``0``
     cannot be elected primary and will not seek election.

.. _replica-set-node-priority:

Node Priority
~~~~~~~~~~~~~

In a replica set, every node has a "priority," which is used to
determine eligibility for :ref:`election <replica-set-elections>` to
"primary." By default, all nodes have a priority of ``1``. Unless the
`priority`` value is modified. All nodes have a single vote in
:ref:`elections <replica-set-elections>`.

.. warning:: Always configure the :js:data:`members.priority` value to
   control which nodes will become primary. Do not configure
   :js:data:`members.votes` except to permit more than 7 secondary
   nodes.

Use the following command sequence in the :option:`mongo` shell to set
or modify a replica set priority:

.. code-block:: javascript

   cfg = rs.conf()
   cfg.members[1].priority = 2
   cfg.members[2].priority = 3
   rs.reconfig(cfg)

This operation sets the priority of the node with an "``_id``" of ``1``
[#rs-conf-members]_ to ``2`` and the priority of the node with an
"``_id``" of ``2`` to ``3``. This setting will ensure that, if both
node ``1`` and ``2`` are eligible for election to primary, that node
``2`` will always win. Furthermore, if ``1`` is primary and ``2``
becomes eligible for election to primary, ``1`` will step down and
force an election to primary.

.. warning:: Replica set reconfiguration can force a reelection in the
   replica set, which will cause the current primary to close all open
   :term:`client` connections.

   Perform routine replica set reconfiguration during scheduled
   maintenance windows.

If a node has ``priority`` set to ``0``, it is ineligible to become
primary, and will not seek elections. :ref:`Hidden
<replica-set-hidden-nodes>`, :ref:`delayed
<replica-set-delayed-nodes>`, and :ref:`arbiters
<replica-set-arbiters>` have priority set to ``0``. Unless configured,
all nodes have a ``priority`` setting equal to ``1``.

.. note::

   The value of ``priority`` can be any floating point
   (i.e. decimal) number between ``0`` and ``1000``, and priorities
   are only used to determine the preference in election and are used
   in compassion's. With the exception of nodes with a priority of
   ``0``, the absolute value of the ``priority`` value is irrelevant.

Replica sets will preferentially elect and maintain the primary status
of the node with the highest ``priority`` setting.

.. [#rs-conf-members] Use :js:func:`rs.conf()` to determine the
   current configuration, particularly the hostname and "``_id``" of
   the members of your replica set.

.. _replica-set-consistency:

Consistency
-----------

In MongoDB, all read operations issued to the primary node of a
replica set are :term:`consistent <strict consistency>`, with the last
write operation.

In some cases write operations will succeed on :term:`secondary` nodes
that have not replicated more recent relevant updates or operations,
which reflects an inconsistent state. This potentially inconsistent
is sometimes characterized as :term:`eventual consistency` because the
secondary node's state will *eventually* reflect the primary's
consistent state, and strict consistency cannot be guaranteed or
assumed for these read operations.

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

In some :term:`failover` situations, write operations are accepted by
a :term:`primary` and not replicated to secondaries before the primary
steps down or another primary is elected. This case is rare and
typically occurs as a result of a network partition. When this node
rejoins the replica set and attempts to continue replication as a
:term:`secondary` those operations that were not replicated have to be
removed, or "rolled back," to maintain database consistency across the
replica set.

The rollback data then is written to a :term:`BSON` file in the
database's :mongodb:setting:`dbpath` directory. Use :doc:`bsondump
</reference/bsondump>` to read the contents of these rollback files
and then manually apply the changes to the new primary. There is no
way for MongoDB to appropriately and fairly handle rollback situations
without manual intervention. Because rollback situations require
administrator's direct input, response to rollbacks, users should
strive to avoid rollbacks as much as possible. Monitor
:term:`replication lag`, :ref:`architect the set
<replica-set-deployment-overview>` to ensure that data is effectively
replicated.

The best strategy for avoiding rollbacks is to ensure :ref:`write
propagation <replica-set-write-propagation>` to all or some of the
nodes in the set. Using these kinds of policies prevents situations
that might create rollbacks.

.. _replica-set-write-propagation:

Write Propagation
~~~~~~~~~~~~~~~~~

When a :term:`client` sends a write operation to a database server,
the operation will return without waiting for the operation to succeed
or return. To verify that the operation is successful, use the
:mongodb:command:`getLastError`. ``getLastError`` is configurable and
can wait to return for journal writes or full disk flush. For replica
sets, ``getLastError`` can return only when the write operation has
propagated to more than one node, or a majority of nodes in the
cluster.

Many drivers have a "safe" or "write concern" mode that automatically
issues a ``getLastError`` command following write operations to ensure
that they succeed. In many cases, "safe mode," provides the desired
method of operation and should nearly always be used with single
nodes. However, safe writes can take longer to return and are not
required in all applications. Using the "``w: "majority"``" option for
``getLastError``, write operations to a replica set will return only
after writes have been replicated to a majority of the members of the
set. At the :option:`mongo` shell, use the following command to ensure
that writes have propagated to a majority of the nodes in the cluster:

.. code-block:: javascript

   db.runCommand( { getLastError: 1, w: "majority" } )
   db.getLastError("majority")

You may also specify "``w: 2``" so that the write operation is
replicated to a second node before returning.

.. note::

   :mongodb:command:`getLastError` assumes the current host,
   therefore, "``w: 2``" waits until the write operation has been
   committed to the current instance and one other node. The current
   node is always counted as "``w: 1``".

You can also configure a "default" ``getLastError`` behavior on the
replica set configuration. For instance:

.. code-block:: javascript

   cfg = rs.conf()
   cfg.settings.getLastErrorDefaults = "w: majority, fsync: false, j: true"
   rs.reconfig(cfg)

When the new configuration is active, the effect of the
``getLastError`` operation will wait until the write operation has
succeeded on a majority of the nodes before writing. By specifying
"``fsync: false``" and "``j: true``" a successful commit of the
operation to the journal and not a full flush to disk is required for
``getLastError`` to return successfully. Use this the
``getLastErrorDefaults``" setting on the sever level to define the
standards for a set-wide "safe mode."

TODO factcheck getlasterrordefaults.

.. _replica-set-read-preference:

Read Preference
~~~~~~~~~~~~~~~

In the default operation, all read operations are targeted at the
:term:`primary` node in a cluster. To distribute reads to
:term:`secondary` nodes, you can set the ``slaveOk`` for your current
session. Issue the following command in the :option:`mongo` shell to
enable secondary reads:

.. code-block:: javascript

     rs.slaveOk()

This :term:`read preference` is activated on a per-connection
basis. See ":js:func:`rs.slaveOk()`" for more information.

Because secondary nodes are not guaranteed to be consistent with the
state of the primary nodes, setting a read preference that allows
reading from secondary nodes, accepts :term:`eventually consistent
<eventual consistency>` read operations. Do not allow secondary reads,
unless you can accept this eventual consistency.

While your read preference controls, to a great extent, the
consistency of your replica set with sufficiently strict :ref:`write
propagation <replica-set-write-propagation>` policies, can be
effectively consistent.

.. note::

   See the documentation for the :term:`driver` you are using
   to interact with MongoDB, regarding the use and default read
   preference settings.

Administrative and Operational Concerns
---------------------------------------

This section provides a brief overview of relevant concerns for
administrators and would-be administrators of replica set deployments.

.. seealso::
   - ":doc:`/administration/replica-sets`"
   - ":doc:`/administration/replication-architectures`"

Deployment
~~~~~~~~~~

Without replication the entire database system is susceptible to a
single point of failure and disruption of the system will render the
database unusable and potentially unrecoverable. Not only does
replication increase the reliability of the database instance, but
replica sets are capable of distributing reads to :term:`secondary`
nodes depending on :term:`read preference`. Particularly for
database work loads dominated by read operations, (i.e. "read heavy")
replica sets can greatly increase the capability of the replica set.

The minimum requirements for a replica set include two nodes with
data, for a :term:`primary` and a secondary, and an :ref:`arbiters
<replica-set-arbiters>`. In most circumstances, however, you will want
to deploy three data nodes within a single site (i.e. data center or
facility.)

For those deployments that rely heavily on distributed reads to
secondary instances, add additional secondaries to the set as load
increases to provide additional resources. As your deployment grows,
consider adding replica instances in secondary data centers or
geographically distinct locations for additional redundancy, ensure
that the quorum of nodes required to elect a primary remains in your
main facility. Depending on the needs of your deployment, consider
adding additional nodes including, a :term:`delayed node` to help
provide protection against human errors and change control, a
:term:`hidden node` to provide an isolated node for reporting and
monitoring, and/or a :ref:`secondary only node
<replica-set-secondary-only-nodes>` for dedicated backups.

Because the process of establishing a new replica set member can be
resource intensive on existing nodes, always deploy a new replicated
instance significantly before the existing replica set is saturated
with the current demands.

.. note::

   :term:`Journaling`, which is enabled by default on 64-bit
   versions of MongoDB after version 2.0, provides single-instance
   write durability. This journaling greatly improves the reliability
   and durability of a database. Unless journaling is enabled, if a
   MongoDB instance terminates ungracefully, up to 60 seconds of data
   can be lost, and the database can be left in an inconsistent state.

   **Use journaling**, however, do not forego proper replication
   because of journaling.

Security
--------

In most cases, :term:`replica set` administers do not have additional
consideration beyond the normal security precautions that all MongoDB
administrators must take. Ensure that:

- Your network configuration will allow every member of the replica
  set to contact every other member of the replica set.

- If you use MongoDB's authentication system to limit access to your
  infrastructure, ensure that you configure a
  :mongodb:setting:`keyfile` on all nodes to permit authentication.

.. seealso:: ":ref:`Replica Set Security <replica-set-security>`"
.. _replica-set-deployment-overview:
.. _replica-set-architecture:

Architecture Possibilities
--------------------------

The architecture and design of the replica set deployment can have a
great impact on the operation and ability of your replica set to meet
demand. The following list provides an overview of general best
practices that may help you deploy systems that are better suited for
your application.

This document provides an overview of the *complete* functionality of
replica sets, which highlights the flexibility of the replica set and
its configuration.; however, for most deployments a conventional
3-node replica set with :js:data:`members.priority` values of ``1``
are sufficient for most production use cases. While the flexibility is
helpful for managing a variety of operational complexities, it almost
always makes sense to let those complex requirements dictate complex
architectures, rather than add unnecessary complexity to your
deployment.

Consider the following factors when developing an architecture for
your replica set:

- Ensure that the members of the replica set will always be able to
  elect a primary node. Run an odd number of nodes or run an arbiter
  on one of your application servers if you have an even number of
  members.

- With geographically distributed nodes, be aware of where the
  "quorum" of nodes will be, in case of likely network partitions,
  attempt to ensure that a primary can be elected among the nodes in
  the secondary node.

- Include a :ref:`hidden <replica-set-hidden-nodes>` or :ref:`delayed
  node <replica-set-delayed-nodes>` in your replica set to support
  dedicated functionality, like backups, reporting, and testing.

- Keep a member of the set in an off-site data center, but ensure that
  its :ref:`priority <replica-set-node-priority>` is configured to
  decrease the chance of it becoming :term:`primary`.

.. seealso:: ":doc:`/administration/replication-architectures`" for
   more information regarding replica set architectures.
