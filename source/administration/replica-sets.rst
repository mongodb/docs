==========================
Replica Set Administration
==========================

.. default-domain:: mongodb

:term:`Replica sets <replica set>` in MongoDB automate the vast
majority of the administrative complexity typically associated with
database replication and management. Nevertheless, some deployment and
long term administrative requirements that require administrator
intervention. This document provides an overview of these tasks as in
addition to general troubleshooting suggestions.

.. seealso::

   - :ref:`Replica Set Reconfiguration Process <replica-set-reconfiguration-usage>`
   - :func:`rs.conf()` and :func:`rs.reconfig()`
   - :doc:`/reference/replica-configuration`

   The following tutorials provide task-oriented instructions for
   specific administrative tasks related to replica set operation.

   - :doc:`/tutorial/convert-replica-set-to-replicated-shard-cluster`
   - :doc:`/tutorial/deploy-geographically-distributed-replica-set`
   - :doc:`/tutorial/deploy-replica-set`
   - :doc:`/tutorial/expand-replica-set`

Procedures
----------

.. _replica-set-admin-procedure-add-member:

Adding Members
~~~~~~~~~~~~~~

From to time, you may need to add an additional member to an existing
:term:`replica set`. The data directory for the new member can:

- have no data. In this case, you must copy all data as part of the
  replication process before the member can exit ":term:`recovering`"
  status, and become a :term:`secondary` member.

TODO: might be worth mentioning that "you" don't have to copy this data, it's done automatically.

- copy the data directory from an existing member to limit the amount
  of time that the recovery process takes.

TODO: if you copy from an existing member, the new member will immediately be a secondary (not recovering).

  If the difference in the amount of time between the most recent
  operation and the most recent operation to the database exceeds the
  length of the :term:`oplog` on the existing members, then the new
  instance will have to completely re-synchronize. Ensure that you can
  copy the data to the new system and begin replication within the
  window allowed by the :term:`oplog`.

TODO: maybe mention you can do this with the db.printReplicationInfo() function.

To add a member to an existing :term:`replica set`, deploy a new
:program:`mongod` instance, specifying the name of the replica set
(i.e. "setname" or ``replSet``) on the command line with the
:option:`--replSet <mongod --replSet>` option or in the configuration
with the :setting:`replSet`. Take note of the host name and
port information for the new :program:`mongod` instance.

TODO: "the configuration
with" -> the configuration file with

Then, log in to the current primary using the :program:`mongo`
shell. Issue the :func:`db.isMaster()` command when connected to *any*
member of the set to determine the current :term:`primary`. Issue the
following command to add the new member to the set.

.. code-block:: javascript

   rs.add("mongo2.example.net:27017")

Alternately, specify an entire configuration document with some or all
of the fields in a :data:`members` document, for example:

.. code-block:: javascript

   rs.add({host: "mongo2.example.net:27017", priority: 0, hidden: true})

TODO: is the _id field automatically populated?

This configures a :term:`hidden member` that is accessible at
``mongo2.example.net:27018``. See ":data:`host <members[n].host>`,"
":data:`priority <members[n].priority>`," and ":data:`hidden
<members[n].hidden>`" for more information about these settings.

.. seealso:: :doc:`/tutorial/expand-replica-set`

.. _replica-set-admin-procedure-remove-members:

Removing Members
~~~~~~~~~~~~~~~~

Administrators can remove any member of a replica set at any time, for
a number of operational reasons. Use the :func:`rs.remove()` function
in the :program:`mongo` shell while connected to the current
:term:`primary`. Issue the :func:`db.isMaster()` command when
connected to *any* member of the set to determine the current
:term:`primary`. Use a command in either of the following forms to
remove the member:

.. code-block:: javascript

   rs.remove("mongo2.example.net:27017")
   rs.remove("mongo3.example.net")

This operation disconnects the shell briefly and forces a
re-connection as the :term:`replica set` renegotiates which member
will be :term:`primary`. The shell will display an error even if this
command succeeds.

You can re-add a removed member to a replica set at any time using the
:ref:`procedure for adding replica set members
<replica-set-admin-procedure-add-member>`. Additionally, consider
using the :ref:`replica set reconfiguration procedure
<replica-set-reconfiguration-usage>` to change the
:data:`members[n].host` value to rename a host in a replica set
directly.

Replacing a Member
~~~~~~~~~~~~~~~~~~

There are two methods for replacing a member of a replica set. First,
you may remove and then re-add a member using the following procedure
in the :program:`mongo` shell:

.. code-block:: javascript

   rs.remove("mongo2.example.net:27018")
   rs.add({host: "mongo2.example.net:27019", priority: 0, hidden: true})

TODO: prior to 2.2, this will almost never work because the _id will change.

Second, you may consider using the following procedure to use
:func:`rs.reconfig()` to change the value of the
:data:`members[n].host` field to reflect the new hostname or port
number. In this case, the :data:`members[n]._id` field is not reused
by the new member.

.. code-block:: javascript

   cfg = rs.conf()
   cfg.members[0].host = "mongo2.example.net:27019"
   rs.reconfig(cfg)

The second method may be useful if you have an existing configuration
and only want to change the hostname of a member rather than
completely remove all configuration related to the existing/previous
set member. The :data:`members[n]._id` field does not change as a
result of this operation.

.. warning::

   Replica set configurations can trigger the current :term:`primary`
   to step down forcing an :term:`election`. This causes the current
   shell session to produce an error even when the operation
   succeeds. Clients connected to this replica set will also
   disconnect.

.. _replica-set-node-priority-configuration:

Adjusting a Member's Priority
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To change the value of the :data:`members[n].priority` value in the
replica set configuration, use the following sequence of commands in
the :program:`mongo` shell:

.. code-block:: javascript

   cfg = rs.conf()
   cfg.members[0].priority = 0.5
   cfg.members[1].priority = 2
   cfg.members[2].priority = 2
   rs.reconfig(cfg)

The first operation sets the local variable "``cfg``" to the contents
of the current replica set configuration using the :func:`rs.conf()`,
which is a :term:`JSON document`. The next three operations change the
:data:`members[n].priority` value in the ``cfg`` document for
:data:`members[n]._id` of ``0``, ``1``, or ``2``. The final operation
calls :func:`rs.reconfig()` with the argument of ``cfg`` to initialize
the new configuration.

If a node has :data:`members[n].priority` set to ``0``, it is
ineligible to become primary, and will not seek
elections. :ref:`Hidden <replica-set-hidden-members>` and
:ref:`delayed <replica-set-delayed-members>` members and
:ref:`arbiters <replica-set-arbiters>` have priority set to
``0``. Unless configured, all nodes have a :data:`members[n].priority`
setting equal to ``1``.

.. note::

   The value of :data:`members[n].priority` can be any floating point
   (i.e. decimal) number between ``0`` and ``1000``, and priorities
   are only used to determine the preference in election. The priority
   value is only used in with other instances. With the exception of
   nodes with a priority of ``0``, the absolute value of the
   :data:`members[n].priority` value is irrelevant.

Replica sets will preferentially elect and maintain the primary status
of the node with the highest :data:`members[n].priority` setting.

.. warning::

   Replica set reconfiguration can force the current primary to step
   down, leading to an election for primary in the replica
   set. Elections cause the current primary to close all open
   :term:`client` connections.

   Perform routine replica set reconfiguration during scheduled
   maintenance windows.

.. seealso:: The ":ref:`Replica Reconfiguration Usage
   <replica-set-reconfiguration-usage>`" example revolves around
   changing the priorities of the :data:`members` of a replica set.

.. _replica-set-procedure-change-oplog-size:

Changing the Oplog Size
~~~~~~~~~~~~~~~~~~~~~~~

Because the :term:`oplog` exists internally as a :term:`capped
collection`, you cannot modify their size in the course of normal
operations. In most cases the default oplog size, which is 5% of total
disk size, [#default-oplog]_ is an acceptable size; however, in some
situations you may need a much larger or smaller oplog. The procedure
follows the following basic steps:

1. Restart the current :term:`primary` instance in the replica set in
   "standalone" mode, running on a different port.

2. Save the last entry from the old (current) oplog, and create a
   backup of the old (current) oplog.

3. Drop the current oplog, and create a new oplog of a different size.

4. Insert the previously saved last entry from the old oplog into the
   new (current) oplog.

5. Restart the server as a member of the replica set on its usual
   port.

6. Apply this procedure to any other member of the replica set that
   *could become* :term:`primary`.

.. seealso:: The ":doc:`/tutorial/change-oplog-size`" tutorial.

.. [#default-oplog] The default oplog size is the *greater* of 1
   gigabyte or 5% of total disk size.

.. _replica-set-node-configurations:

Node Configurations
-------------------

All replica sets have a single :term:`primary` node and one or more
:term:`secondary` nodes. Replica sets sets allow you to configure
secondary nodes in a variety of ways. This section describes these
configurations and also describes the arbiter node type.

.. note::

   A replica set can have up to 12 nodes, but only 7 nodes can have
   votes. See ":ref:`non-voting members <replica-set-non-voting-members>`"
   for configuration information regarding non-voting nodes.

.. warning::

   The :func:`rs.reconfig()` shell command can force the current
   primary to step down and causes an election. When the primary node
   steps down, the :program:`mongod` closes all client
   connections. While, this typically takes 10-20 seconds, attempt to
   make these changes during scheduled maintenance periods.

.. _replica-set-secondary-only-configuration:

Secondary-Only
~~~~~~~~~~~~~~

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

TODO: this is actually 4 nodes...

This operation sets the member ``0`` to ``0`` and cannot become
primary. Member ``3`` has a priority of ``2`` and will become primary,
if eligible, under most circumstances. Member ``2`` has a priority of
``1``, and will become primary if no node with a higher priority is
eligible to be primary. Since all additional nodes in the set will
also have a prio1rity of ``1`` by default, member ``2`` and all
additional nodes will be equally likely to become primary if higher
priority nodes are not accessible. Finally, member ``1`` has a
priority of ``0.5``, which makes it less likely to become primary than
all other nodes but doesn't prohibit the possibility.

.. note::

   If your replica set has an even number members, add an
   :ref:`arbiter <replica-set-arbiters>` to ensure that
   nodes wil be able to quickly obtain a majority of votes in an
   :ref:`election <replica-set-elections>` for primary.

.. seealso:: ":data:`members[n].priority`" and ":ref:`Replica Set
   Reconfiguration <replica-set-reconfiguration-usage>`."

.. _replica-set-hidden-configuration:

Hidden
~~~~~~

To configure a :term:`hidden member`, use the following sequence of
operations in the :program:`mongo` shell:

.. code-block:: javascript

   cfg = rs.conf()
   cfg.members[0].priority = 0
   cfg.members[0].hidden = true
   rs.reconfig(cfg)

TODO: it might be worth noting that, currently, you must send the reconfig command to
a member that can become primary in the new configuration.  So, if members[0] is the
current primary, this reconfig won't work.

After re-configuring the set, the node with the "``_id``" of ``0``,
has a priority of ``0`` so that it cannot become master, while the
other nodes in the set will not advertise the hidden node in the
:dbcommand:`isMaster` or :func:`db.isMaster()` output.

.. seealso:: ":ref:`Replica Set Read Preference <replica-set-read-preference>`."
   ":data:`members[n].hidden`," ":data:`members[n].priority`,"
   and ":ref:`Replica Set Reconfiguration <replica-set-reconfiguration-usage>`."

.. _replica-set-delayed-configuration:

Delayed
~~~~~~~

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

.. warning::

   The length of the secondary "``slaveDelay``" must fit within the
   window of the :term:`oplog`. If the oplog is shorter than the
   ``slaveDelay`` window the delayed member will not be able to
   successfully replicate operations.

.. seealso:: ":data:`members[n].slaveDelay`," ":ref:`Replica Set
   Reconfiguration <replica-set-reconfiguration-usage>`," ":ref:`Oplog
   Sizing <replica-set-oplog-sizing>`," and
   ":ref:`replica-set-procedure-change-oplog-size`."

.. _replica-set-arbiter-configuration:

Arbiters
~~~~~~~~

Use the following command to start an arbiter:

.. code-block:: sh

   mongod --replSet [setname]

Replace "``[setname]``" with the name of the replica set that the
arbiter will join. Then in the :program:`mongo` shell, while connected
to the *current primary* node, issue the following command:

.. code-block:: javascript

   rs.addArb("[hostname]:[port]")

Replace the "``"[hostname]:[port]"``" string with the name of the
hostname and port of the arbiter that you wish to add to the set.

.. seealso:: ":setting:`replSet`," ":program:`mongod --replSet`,
   and ":func:`rs.addArb()`."

.. _replica-set-non-voting-configuration:

Non-Voting
~~~~~~~~~~

To disable a node's ability to vote in :ref:`elections
<replica-set-elections>` use the following command sequence in the
:program:`mongo` shell.

.. code-block:: javascript

   cfg = rs.conf()
   cfg.members[3].votes = 0
   cfg.members[4].votes = 0
   cfg.members[5].votes = 0
   rs.reconfig(cfg)

This sequence sets gives ``0`` votes to set members with the ``_id``
values of ``3``, ``4``, and ``5``. This setting allows the set to
elect these members as :term:`primary`, but does not allow them to
vote in elections. If you have three non-voting nodes, you can add
three additional voting nodes to your set. Place voting nodes so that
your designated primary node or nodes can reach a majority of votes in
the event of a network partition.

.. note::

   In general use, when possible all nodes should have only 1 vote to
   prevent intermittent ties, deadlock, or the wrong nodes from
   becoming :term:`primary`. Use ":ref:`Replica Set Priorities
   <replica-set-node-priority>`" to control which nodes are more
   likely to become primary.

.. seealso:: ":data:`members[n].votes`" and ":ref:`Replica Set
   Reconfiguration <replica-set-reconfiguration-usage>`."

Troubleshooting
---------------

This section defines reasonable troubleshooting processes for common
operational challenges. While there is no single causes or guaranteed
response strategies for any of these symptoms, the following sections
provide good places to start a troubleshooting investigation with
:term:`replica sets <replica set>`.

.. seealso:: ":doc:`/administration/monitoring`."

.. _replica-set-replication-lag:

Replication Lag
~~~~~~~~~~~~~~~

Replication lag is a delay between an operation on the :term:`primary`
and the application of that operation from :term:`oplog` to the
:term:`secondary`. Such lag can be a significant issue, and can
seriously affect MongoDB replica set deployments. Excessive
replication lag makes "lagged" members ineligible to become
:term:`primary` quickly and increases the possibility that distributed
read operations will be inconsistent.

Identify replication lag by checking the values of
:data:`members[n].optimeDate` for each member of the replica set
using the :func:`rs.status()` function in the :program:`mongo`
shell.

Possible causes of replication lag include:

- **Network Latency.**

  Check the network routes between the members of your set, to ensure
  that there is no packet loss or network routing issue.

  Use tools including :command:`ping` to test latency between set
  members and :command:`traceroute` to expose the routing of packets
  network endpoints.

- **Disk Throughput.**

  If the file system and disk device on the :term:`secondary` is
  unable to flush data to disk as quickly as the :term:`primary`, then
  the secondary will have difficulty keeping state. Disk related
  issues are incredibly prevalent on multi-tenant systems, including
  vitalized instances, and can be transient if the system accesses
  disk devices are over an IP network (as is the case with Amazon's
  EBS system.)

  Use system-level tools to assess disk status including
  :command:`iostat` or :command:`vmstat`.

- **Concurrency.**

  In some cases, long running operations on the primary can block
  replication on :term:`secondaries <secondary>`. You can use
  :term:`write concern` to prevent write operations from returning
  unless replication can keep up with the write load.

  Use the :term:`database profiler` to see if there are slow queries
  or long running operations that correspond to the incidences of lag.

Failover and Recovery
~~~~~~~~~~~~~~~~~~~~~

In most cases, failover occurs with out administrator intervention
seconds after the :term:`primary` steps down or becomes inaccessible
and ineligible to act as primary. If your MongoDB deployment does not
failover according to expectations, consider the following operational
errors:

- No remaining member is able to form a majority. This can happen as a
  result of network portions that render some members
  inaccessible. Architect your deployment to ensure that a majority of
  set members can elect a primary in the same facility as core
  application systems.

- No member is eligible to become :term:`primary`. Members must have a
  :data:`members[n].priority` setting greater than ``0``, have state
  that is less than ten seconds behind the last operation to the
  :term:`replica set`, and generally be *more* up to date than the
  voting members.

In many senses, :ref:`rollbacks <replica-set-rollbacks>` represent a
graceful recovery from an impossible failover and recovery situation.

Rollbacks occur when a primary accepts writes that other members of
the set do not successfully replicate before the primary steps
down. When the former primary begins replicating again it performs a
"rollback." Rollbacks remove those operations from the instance that
were never replicated to the set so that the data set is in a
consistent state. The :program:`mongod` program writes rolled back
data to a :term:`BSON`.

You can prevent Rollbacks prevented by ensuring safe writes by using
the appropriate :term:`write concern`.

TODO: "rollback" is not a proper noun.

.. seealso:: ":ref:`Replica Set Elections <replica-set-elections>`"
