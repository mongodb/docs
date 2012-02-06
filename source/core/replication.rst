========================
Replication Fundamentals
========================

.. default-domain:: mongodb

This document provides an overview of the core concepts surrounding
MongoDB's replication.

In MongoDB, a ":term:`replica set`" provides a replicated database cluster. [#master-slave]_ Most replica
sets consists of two or more :program:`mongod` instances with at most one
of these designated as the primary node and the rest as secondary
nodes. Clients direct all writes to the primary node, while
the secondary nodes replicate from the primary asynchronously.

Database replication with MongoDB, as with other systems, adds redundancy, helps to
ensure high availability, simplifies certain administrative tasks
such as backups, and may increase read capacity. Most production
deployments are or should use replication.

.. seealso:: The ":doc:`/replication`" index for a list of all
   documents in this manual that contain information related to the
   operation and use of MongoDB's replica sets.

Overview
--------

If you're familiar with other database systems, you may think about
replica sets as a more sophisticated form of traditional master-slave replication.
In master-slave replication, a ":term:`master`" node accepts writes while one or more
":term:`slave`" nodes replicate those write operations and thus
maintain data sets identical to the master. In the context of
a replica set, the node currently accepting write operations is the
"**primary**", and the replicating nodes are "**secondaries**".

MongoDB's replica sets also provide automated failover. If a
:term:`primary` node fails, the remaining members can elect a
new primary node with no administrator intervention.

Whenever the primary node becomes unreachable, the secondary nodes trigger an
:ref:`election <replica-set-elections>`. The first
node to receive votes from a majority of the set will become
primary. The most important feature of replica
set elections is that a majority of the original number of nodes in the
replica set must be present for election to succeed. If you have a
three-node replica set, the set can elect a primary when two
or three nodes can connect to each other. If two nodes in the replica
go offline, then the remaining node will remain a secondary.

.. note::

   When an election occurs, the :program:`mongod` instances will close
   all client connections. This ensures that the clients maintain an accurate
   view of the :term:`replica set` and helps prevent :term:`rollbacks <rollback>`.

Replication itself works by way of a special :term:`capped collection`
called the :term:`oplog`. This collection keeps a rolling record of all
operations applied to the primary node. Secondary nodes then replicate this log by
applying the operations to themselves. Note that this process is asynchronous.
Under normal operation, secondary nodes will reflect writes within one
second of the primary. However, various exceptional situations may
cause secondaries lag behind further. See :term:`replication lag`
for details.

All nodes send heartbeats to all other nodes, and
will pull operations from the node with the lowest "ping" time.

TODO should we organize some of this under an "implementation" header?

MongoDB uses :term:`single master replication` to ensure that the
database remains consistent. However, clients possible to modify the
:ref:`read preferences <replica-set-read-preference>` on a
per-connection basis in order to distribute read operations to the
secondary members of a replica set. Read-heavy deployments may
achieve greater query volumes by distributing reads to secondary
nodes. But keep in mind that replication is asynchronous;
therefore, reads from secondaries may not always reflect the latest
writes to the primary. See the ":ref:`consistency
<replica-set-consistency>`" section for more about
":ref:`read preference <replica-set-read-preference>`" and
":ref:`write propagation <replica-set-write-propagation>`."

.. note::

   Use :js:func:`db.getReplicationInfo()` from a secondary node
   and the ":doc:`replication status </reference/replication-info>`
   output to asses the current state of replication, and determine if
   there is any unintended replication delay.

In the default configuration, all have nodes an equal chance of
becoming primary; however, it's possible to set "priorities" that
weight the election. In some architectures, there may be operational
reasons for increasing the likelihood of a specific replica set member
becoming primary. For instance, a node located in a remote data
center should become primary . See: ":ref:`node
priority <replica-set-node-priority>`" for more background on this
concept.

Replica sets can also include nodes with four special
configurations which affect membership behavior in a replica
set. Consider the following node types:

- :ref:`Secondary-only <replica-set-secondary-only-nodes>` nodes have
  their "priority" set to 0 and thus not eligible for election as primary nodes.

- :ref:`Hidden <replica-set-hidden-nodes>` nodes do not appear in the
  output of :js:func:`db.isMaster()`. This setting prevents clients
  from discovering, and thus potentially queries, the node in question.

- :ref:`Delayed <replica-set-delayed-nodes>` nodes lag a fixed period
  of time behind the the primary node. These nodes are typically used
  for disaster recovery scenarios. For example, if an administrator
  mistakenly truncates a collection, and you discover the mistake within
  the lag window, then you can manually fail over to the delayed node.

- :ref:`Arbiters <replica-set-arbiters>` exist solely to participate
  in elections. They do not replicate data from the primary.

In almost every case, replica sets simplify the process of
administering database replication; however, replica sets still have a
unique set of administrative requirements and concerns. Choosing the
right :doc:`system architecture </administration/replication-architectures>`
for your data set is crucial.

Administrators of replica sets also have unique :ref:`monitoring
<replica-set-monitoring>`, and :ref:`security <replica-set-security>`
concerns. The :ref:`replica set functions <replica-set-functions>` in
the :program:`mongo` shell, provide the tools necessary for replica set
administration. In particular use the :js:func:`rs.conf()` to return a
:term:`JSON document` that holds the :doc:`replica set configuration
</reference/replica-configuration>`, and :js:func:`rs.reconfig()` to
modify the configuration of an existing replica set.

.. [#master-slave] MongoDB also provides conventional master/slave
   replication. Master/slave replication operates by way of the same
   mechanism as replica sets, but lacks the automatic failover
   capabilities. While replica sets are the recommended solution for
   production, a replica set can support only 12 nodes in total.
   If your deployment requires more than 11 :term:`slave` nodes, you'll
   need to use master/slave replication.

.. _replica-set-node-configurations:

Node Configurations
-------------------

All replica sets have a single :term:`primary` node and one or more
:term:`secondary` nodes. Replica sets sets allow you to configure
secondary nodes in a variey of ways. This section describes these
configurations and also describes the arbiter node type.

Note that a replica set can have up to 12 nodes, but only 7 nodes can have
votes. See ":ref:`non-voting nodes <replica-set-non-voting-nodes>`"
for configuration information regarding non-voting nodes.

.. note::

   The :js:func:`rs.reconfig()` shell command can force the current
   primary to step down and causes an election. When the primary node
   steps down, the :program:`mongod` closes all client
   connections. While, this typically takes 10-20 seconds, attempt to
   make these changes during scheduled maintenance periods.

TODO this note should go on the practical page.

.. _replica-set-secondary-only-nodes:

Secondary-Only Nodes
~~~~~~~~~~~~~~~~~~~~

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

Given a three node replica set, with member "``_id``" values of:
``0``, ``1``, and ``2``, use the following sequence of operations in
the :program:`mongo` shell to modify node priorities:

.. code-block:: javascript

   cfg = rs.conf()
   cfg.members[0].priority = 0
   cfg.members[1].priority = 0.5
   cfg.members[2].priority = 1
   cfg.members[3].priority = 2
   rs.reconfig(cfg)

This operation sets the member ``0`` to ``0`` and cannot become
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

.. seealso:: ":js:data:`members[n].priority`" and ":ref:`Replica Set
   Reconfiguration <replica-set-reconfiguration-usage>`."

TODO this needs to be a lot more concise. Move code to practical part.

.. _replica-set-hidden-nodes:

Hidden Nodes
~~~~~~~~~~~~

Hidden nodes are members of a replica set that are not only unable to
become primary (i.e. have :ref:`priority
<replica-set-node-priority>` set to a value of ``0``, ) but are also
invisible to client applications.

TODO move most of this to the practical section.

.. seealso:: ":ref:`Replica Set Read Preference <replica-set-read-preference>`."

To configure a hidden node, use the following sequence of operations
in the :program:`mongo` shell:

.. code-block:: javascript

   cfg = rs.conf()
   cfg.members[0].priority = 0
   cfg.members[0].hidden = true
   rs.reconfig(cfg)

After re-configuring the set, the node with the "``_id``" of ``0``,
has a priority of ``0`` so that it cannot become master, while the
other nodes in the set will not advertise the hidden node in the
:dbcommand:`isMaster` or :js:func:`db.isMaster()` output.

Hidden nodes are ideal for instances that will have significantly
different usage patterns than the other nodes and require separation 
from normal traffic. Often nodes for reporting, dedicated
backups, and testing/integration need to operate as hidden needs.

.. seealso:: ":js:data:`members[n].hidden`,"
   ":js:data:`members[n].priority`," and ":ref:`Replica Set
   Reconfiguration <replica-set-reconfiguration-usage>`."

.. _replica-set-delayed-nodes:

Delayed Nodes
~~~~~~~~~~~~~

Delayed nodes apply operations from the primary's :term:`oplog` with a specified
delay. Delayed nodes must have a :term:`priority` set to ``0`` to prevent them from
becoming primary in their replica sets.

TODO move to practical.

To configure a node with a one hour delay, use the following sequence
of operations in the :program:`mongo` shell:

.. code-block:: javascript

   cfg = rs.conf()
   cfg.members[0].priority = 0
   cfg.members[0].slaveDelay = 3600
   rs.reconfig(cfg)

After the set reconfigures, the set member with the "``_id``" of
``0``, has a priority of ``0`` so that it cannot become primary and
will delay replication by 3600 seconds, or 1 hour.

TODO keep this here.

Typically delayed nodes useful for preventing or recovering from
various kinds of human error. Such errors may include inadvertently
deleted databases or botched application upgrades. Consider the
following factors when determining the amount of slave delay to
apply:

- Ensure that the length of the delay is equal to or greater than your
  maintenance window.

- The size of the oplog is sufficient to capture *more than* the
  number of operations that typically occur in that period of time.

TODO do we talk about sizing the oplog anywhere?

.. seealso:: ":js:data:`members[n].slaveDelay`" and ":ref:`Replica Set
   Reconfiguration <replica-set-reconfiguration-usage>`."

.. _replica-set-arbiters:

Arbiters
~~~~~~~~

Arbiters are special :program:`mongod` instances that do not hold a
copy of the data and thus cannot become primary. Arbiters exist solely
participate in elections.

.. note::

   Because of their minimal system requirements, you may safely deploy an
   arbiter on a system with another work load such as an application
   server or monitoring node.

TODO move the rest of this to the implementation section.

Use the following command to start an arbiter: ::

     mongod --replSet [setname]

Replace "``[setname]``" with the name of the replica set that the
arbiter will join. Then in the :program:`mongo` shell, while connected
to the *current primary* node, issue the following command:

.. code-block:: javascript

   rs.addArb("[hostname]:[port]")

Replace the "``"[hostname]:[port]"``" string with the name of the
hostname and port of the arbiter that you wish to add to the set.

.. seealso:: ":setting:`replSet`," ":program:`mongod --replSet`,
   and ":js:func:`rs.addArb()`."

.. _replica-set-non-voting-nodes:

Non-Voting Nodes
~~~~~~~~~~~~~~~~

A replica set may contain as many as 12 nodes; however, only 7 nodes
can vote in elections. This means that if you want a replica set
with more than 7 nodes, then you'll have to disable voting on the
excess nodes by settings the `votes` key to 0.

TODO link whatever config docs will exist on this.

To disable a
node's ability to vote in :ref:`elections <replica-set-elections>` use
the following command sequence in the :program:`mongo` shell.

.. code-block:: javascript

   cfg = rs.conf()
   cfg.members[3].votes = 0
   cfg.members[4].votes = 0
   cfg.members[5].votes = 0
   rs.reconfig(cfg)

This sequence sets gives ``0`` votes to set members with the ``_id``
values of ``3``, ``4``, and ``5``. This setting allows the set to
elect these members as :term:`primary`, but does not allow them to
vote in elections and allows you to add three additional voting nodes
to your set. Place voting nodes so that your
designated primary node or nodes can reach a majority of votes in the
event of a network partition.

.. note::

   In general use, when possible all nodes should have only 1 vote to
   prevent intermittent ties, deadlock, or the wrong nodes from
   becoming :term:`primary`. Use ":ref:`Replica Set Priorities
   <replica-set-node-priority>`" to control which nodes are more
   likely to be elected primary.

.. seealso:: ":js:data:`members[n].votes`" and ":ref:`Replica Set
   Reconfiguration <replica-set-reconfiguration-usage>`."

.. _replica-set-failover:

Failover
--------

Replica sets feature automated failover. If the
:term:`primary` node goes offline or becomes unresponsive and a majority
of the original nodes can still connect to each other, the set will
elect a new primary.

While :term:`failover` is automatic, :term:`replica set <replica set>`
administrators should still understand exactly how this process
works. This section below describe failover in detail.

.. _replica-set-elections:

Elections
~~~~~~~~~

When you initialize a replica set for the first time, and when
any failover occurs, an election takes place to decide which
member should become primary.

Elections are the process that the members of a replica set use to
select the primary node in a cluster. Elections follow two events:
primary node that "steps down" or by a secondary node that cannot see
a primary node. All members have one vote in an election, and every
node can veto an election. A single node's veto will invalidate the
election.

An existing primary will step down in response to the
:dbcommand:`replSetStepDown` command, or if it sees that one of
the current secondaries is eligible for election *and* has a higher
priority. A secondary node will call for an election if it cannot
establish a connection to a primary node. Primary nodes will also step
down when they cannot contact a majority of the members of the replica
set. When the current primary steps down, it closes all open client
connections to prevent clients from unknowingly writing data to a
non-primary node.

In an election, every member, including :ref:`hidden
<replica-set-hidden-nodes>` nodes, :ref:`arbiters <replica-set-arbiters>`,
and even recovering nodes get a single
vote. Members will give votes to every eligible node that calls an
election.

TODO this is very technical and will likely be confusing to most readers. We should place this in a document describing replication internals or something.

A voting node will veto an election under the following conditions:

- If the node seeking an election is not a member of the voter's set.

- If the node seeking an election is more than 10 seconds behind the
  most recent operation to the replica set.

- If the node seeking an election has a lower priority than other node
  in the set that is also eligible for election.

- If the current :term:`primary` node has more recent operations than the
  (i.e. a higher "optime") than then node seeking election, from the
  perspective of the voting node.

- The current primary will also veto an election if it has the same or
  more recent operations (i.e. a higher or "equal optime") than the
  node seeking election.

The first node to receive votes from a majority of members in a set
becomes the next primary until the next election. Be
aware of the following conditions and possible situations:

- Replica sets send heartbeats (pings) to each other every 2
  seconds. If a heartbeat does not return for more than 10 seconds,
  the other nodes mark the delinquent node as inaccessible.

- Replica set members only compare  priorities with other members of
  the set. The absolute value of priorities does not have any impact on
  the outcome of replica set elections.

  .. note::

     The only exception is that members with a priority of ``0`` cannot
     become :term:`primary` and will not seek election.

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

TODO move or remove the rest of this.

Use the following command sequence in the :program:`mongo` shell to set
or modify a replica set priority:

.. code-block:: javascript

   cfg = rs.conf()
   cfg.members[1].priority = 2
   cfg.members[2].priority = 3
   rs.reconfig(cfg)

This operation sets the priority of the node with an "``_id``" of
``1`` [#rs-conf-members]_ to ``2`` and the priority of the node with
an "``_id``" of ``2`` to ``3``. This setting will ensure that, if both
node ``1`` and ``2`` are eligible for election to primary, that node
``2`` will always win. Furthermore, if ``1`` is primary and ``2``
becomes eligible for election to primary, ``1`` will step down forcing
an election for primary.

.. warning::

   Replica set reconfiguration can force the current primary to step
   down, leading to an election for primary in the replica
   set. Elections cause the current primary to close all open
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

   The value of ``priority`` can be any floating point (i.e. decimal)
   number between ``0`` and ``1000``, and priorities are only used to
   determine the preference in election. The priority value is only
   used in with other instances. With the exception of nodes with a priority of ``0``,
   the absolute value of the ``priority`` value is irrelevant.

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
propagation <replica-set-write-propagation>` to all or some of the
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

.. _replica-set-write-concern:

Write Concern
~~~~~~~~~~~~~

When a :term:`client` sends a write operation to a database server,
the operation will return without waiting for the operation to succeed
or return. To verify that the operation is successful, use the
:dbcommand:`getLastError`
command. :dbcommand:`getLastError` is configurable and can wait
to return for journal writes or full disk flush. For replica sets,
:dbcommand:`getLastError` can return only when the write
operation has propagated to more than one node, or a majority of nodes
in the cluster.

Many drivers have a "safe" or "write concern" mode that automatically
issues a :dbcommand:`getLastError` command following write
operations to ensure that they succeed. "Safe mode,"
provides confirmation of write operations to clients, which is often
the expected method of operation, and is particularly useful when
using standalone nodes. 

However, safe writes can take longer to return
and are not required in all applications. Using the "``w:
"majority"``" option for :dbcommand:`getLastError`, write
operations to a replica set will return only after a write operation
has replicated to a majority of the members of the set. At the
:program:`mongo` shell, use the following command to ensure that writes
have propagated to a majority of the nodes in the cluster:

.. code-block:: javascript

   db.runCommand( { getLastError: 1, w: "majority" } )
   db.getLastError("majority")

You may also specify "``w: 2``" so that the write operation is
replicated to a second node before the command returns.

.. note::

   :dbcommand:`getLastError` assumes the current host,
   therefore, "``w: 2``" waits until the :term:`primary` and one other
   member of the replica set commits the write operation. The current
   primary always counts as "``w: 1``".

You can also configure a "default" :dbcommand:``getLastError` behavior on the
replica set configuration. For instance:

.. code-block:: javascript

   cfg = rs.conf()
   cfg.settings.getLastErrorDefaults = "w: majority, fsync: false, j: true"
   rs.reconfig(cfg)

When the new configuration is active, the effect of the
:dbcommand:`getLastError` operation will wait until the write
operation has succeeded on a majority of the nodes before writing. By
specifying "``fsync: false``" and "``j: true``" a successful commit of
the operation to the journal is all that :dbcommand:`getLastError`
requires to return succesullly, rather than a full flush to disk. Use this the
:js:data:`getLastErrorDefaults`" setting on the sever level to define the
standards for a set-wide "safe mode." The default setting will only
affect :dbcommand:`getLastError` commands with *no* other
arguments.

.. _replica-set-read-preference:

Read Preference
~~~~~~~~~~~~~~~

By default, clients will direct reads to the
:term:`primary` node in a cluster. To distribute reads to
:term:`secondary` nodes, most drivers allow you to set a
``readPreference`` value for the
current session. Issue the following command in the :program:`mongo`
shell to enable secondary reads:

.. code-block:: javascript

     rs.slaveOk()

Clients set :term:`read preference` on a per-connection
basis. See ":js:func:`rs.slaveOk()`" for more information.

Because secondary nodes are not guaranteed to be consistent with the
state of the primary nodes, setting a read preference that allows
reading from secondary nodes, accepts :term:`eventually consistent
<eventual consistency>` read operations. Do not allow secondary reads,
unless you can accept this eventual consistency.

While read preference controls the consistency of query results from a
replica set, used in combination with sufficiently strict :ref:`write
propagation <replica-set-write-propagation>` policies a replica set
can be totally consistent.

.. note::

   See the documentation for the :term:`driver` you are using to
   interact with MongoDB, regarding the use and default read
   preference settings.

Administrative and Operational Concerns
---------------------------------------

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
exisiting replica sets significantly before current demand saturates
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

Architecture Possibilities
~~~~~~~~~~~~~~~~~~~~~~~~~~

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
