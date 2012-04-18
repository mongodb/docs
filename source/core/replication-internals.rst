=====================
Replication Internals
=====================

.. default-domain:: mongodb

.. _replica-set-oplog:

Synopsis
--------

This document provides a more in-depth explanation of the internals
and operation of replica set features. This material is not necessary
for normal operation or application development, but may be
useful for troubleshooting, helpful understanding MongoDB's behavior,
or interesting for learning about MongoDB's approach.

Oplog
-----

Replication itself works by way of a special :term:`capped collection`
called the :term:`oplog`. This collection keeps a rolling record of
all operations applied to the primary node. Secondary nodes then
replicate this log by applying the operations to themselves. Note that
this process is asynchronous.  Under normal operation, secondary nodes
will reflect writes within one second of the primary. However, various
exceptional situations may cause secondaries lag behind further. See
:term:`replication lag` for details.

All nodes send heartbeats to all other nodes, and can import
operations to into its oplog from any other node in the
cluster.

.. In 2.0, replicas would import entries from the member lowest
.. "ping," This wasn't true in 1.8 and will likely change in 2.2.

.. _replica-set-implementation:

Implementation
--------------

MongoDB uses :term:`single-master replication` to ensure that the
database remains consistent. However, clients may modify the
:ref:`read preferences <replica-set-read-preference>` on a
per-connection basis in order to distribute read operations to the
secondary members of a replica set. Read-heavy deployments may achieve
greater query volumes by distributing reads to secondary nodes. But
keep in mind that replication is asynchronous; therefore, reads from
secondaries may not always reflect the latest writes to the
primary. See the ":ref:`consistency <replica-set-consistency>`"
section for more about ":ref:`read preference
<replica-set-read-preference>`" and ":ref:`write concern
<replica-set-write-concern>`."

.. note::

   Use :func:`db.getReplicationInfo()` from a secondary node
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

- :ref:`Secondary-only <replica-set-secondary-only-members>` members have
  their "priority" set to 0 and thus not eligible for election as primary nodes.

- :ref:`Hidden <replica-set-hidden-members>` members do not appear in the
  output of :func:`db.isMaster()`. This setting prevents clients
  from discovering, and thus potentially queries, the node in question.

- :ref:`Delayed <replica-set-delayed-members>` members lag a fixed period
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
administration. In particular use the :func:`rs.conf()` to return a
:term:`document` that holds the :doc:`replica set configuration
</reference/replica-configuration>`, and :func:`rs.reconfig()` to
modify the configuration of an existing replica set.

.. _replica-set-election-internals:

Elections
---------

When you initialize a replica set for the first time, and when
any failover occurs, an election takes place to decide which
member should become primary.

Elections are the process that the members of a replica set use to
select the primary node in a cluster. Elections follow two events:
a primary node that "steps down" or a :term:`secondary` member that
loses contact with a :term:`primary` node. All members have one vote
in an election, and every :program:`mongod` can veto an election. A
single member's veto will invalidate the election.

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
<replica-set-hidden-members>` members, :ref:`arbiters
<replica-set-arbiters>`, and even recovering nodes get a single
vote. Members will give votes to every eligible node that calls an
election.

A voting node will veto an election under the following conditions:

- If the node seeking an election is not a member of the voter's set.

- If the node seeking an election is more than 10 seconds behind the
  most recent operation to the replica set.

- If the node seeking an election has a lower priority than another node
  in the set that is also eligible for election.

- If the current :term:`primary` node has more recent operations 
  (i.e. a higher "optime") than the node seeking election, from the
  perspective of the voting node.

- The current primary will also veto an election if it has the same or
  more recent operations (i.e. a "higher or equal optime") than the
  node seeking election.

The first node to receive votes from a majority of members in a set
becomes the next primary until the next election. Be
aware of the following conditions and possible situations:

- Replica set members send heartbeats (pings) to each other every 2
  seconds. If a heartbeat does not return for more than 10 seconds,
  the other nodes mark the delinquent node as inaccessible.

- Replica set members only compare priorities with other members of
  the set. The absolute value of priorities does not have any impact on
  the outcome of replica set elections.

  .. note::

     The only exception is that members with a priority of ``0`` cannot
     become :term:`primary` and will not seek election.
