=========================
Replication Architectures
=========================

.. default-domain:: mongodb

There is no single :term:`replica set` architecture that is compatible
or ideal for every deployment or environment. Indeed the flexibility
of replica sets is perhaps its greatest strenght. This document
outlines and describes the most prevalent deployment patterns for
replica set administrators.

.. seealso:: ":doc:`/administration/replica-sets`" and
   ":doc:`/reference/replica-configuration`."

Three Member Sets
------------------

The minimum *recommend* architecture for a :term:`replica set`
consists of:

- One :term:`primary node <primary>`.

- Two :term:`secondary nodes <secondary>`, which can become the
  primary node at any time.

This makes :ref:`failover <replica-set-failover>` possible, and
ensures that there are two independent copies of the entire data set
at all times. Even if one node is inaccessible, the set will still be
able to elect another nodes as :term:`primary`, and continue
replication until the first node is accessible again or a replacement
set member can be initialized.

.. note::

   The minimum *supported* configuration for replica sets includes one
   :term:`primary` node, one :term:`secondary` node, and one
   :ref:`arbiter <replica-set-arbiters>`. The arbiter, requires fewer
   resources, and lowers the total cost of the replica set,
   at the cost of a great deal of redundancy and operational
   flexibility.

.. seealso:: ":doc:`/tutorial/deploy-replica-set`."

Sets with More Than Three Members
---------------------------------

Add additional members to a replica set to increase redundancy or to
provide additional resources for distributing secondary read
operations.

In general, when deploying larger replica sets, ensure the following
architectural conditions are true:

- The set has an odd number of voting members.

  Deploy a single :ref:`arbiter <replica-set-arbiters>`, if you have
  an even number of voting replica set members.

- The set only has 7 voting members at any time.

- Every member with a :js:data:`priority <members[n].priority>` greater
  than ``0`` can function as ``primary`` in a :term:`failover`
  situation. If a member does not have this capability (i.e. resource
  constraints,) set its ``priority`` value to ``0``.

- A majority *of the set's* members exist in the main data center.

.. seealso:: ":doc:`/tutorial/expand-replica-set`."

.. _replica-set-geographical-distribution:

Geographically Distributed Sets
-------------------------------

If you have infrastructure in more than one facility, you may want to
consider keeping one member of the replica set in a secondary
facility. Typically this member should have the :js:data:`priority
<members[n].priority>` :ref:`set <replica-set-reconfiguration-usage>` to
``0`` to prevent the node from ever becoming primary.

In many circumstances, these deployments consist of the following:

- One :term:`primary node <primary>` in the first (i.e. primary) data
  center.

- One :term:`secondary node <secondary>` in the first data center that
  can become primary at any time.

- One secondary node in another data center, that is ineligible to
  become primary (i.e. with a :js:data:`members[n].priority` value of
  ``0``.)

If any of the members fail, the replica set will still be able to
elect a primary node. If the connection between the data center fails,
the member or members in the second data center cannot become primary
independently, and the nodes in the primary data center will continue
to function.

If the primary data center fails, recovering from the database
instance in the secondary facility requires manual intervention, but
with proper :term:`write concern <write propagation>` there will be no
data loss and downtime is typically be minimal.

For deployments that maintain three members the primary data center,
adding a node in a second data center will create an even number of
nodes, which may result in ties during elections for
:term:`primary`. In this situation deploy an :ref:`arbiter
<replica-set-arbiters>` in your primary data center to ensure that a
primary is always electable.

.. seealso:: ":doc:`/tutorial/deploy-geographically-distributed-replica-set`"

Hidden and Non-Voting Nodes
---------------------------

In some cases it may be useful to maintain node that has an always
up-to-date copy of the entire data set, but that cannot become
primary. Typically these nodes are used for backup, reporting, or as
cold standbys. There are three settings relevant for these kinds of
nodes:

- **Priority**: These nodes are configured so that they either cannot
  become :term:`primary`, or are *very* unlikely to become primary. In
  all other respects lower-priority nodes are identical any other
  replica set member. (:ref:`see also <replica-set-secondary-only-nodes>`.)

- **Hidden**: These nodes cannot become primary, but are hidden from
  the output of :js:func:`db.isMaster()` or the database command
  :dbcommand:`isMaster`, which prevents clients and drivers from using
  these nodes for secondary reads. (:ref:`see also
  <replica-set-hidden-nodes>`.)

- **Voting**: This changes the number of votes that a node has in
  elections for master. In general use priority to control the outcome
  of elections, as weighting votes introduces operational complexities
  and the potential. Only modify the number of votes, if you need to
  have more than 7 members of a replica set. (:ref:`see also
  <replica-set-non-voting-nodes>`.)

Backups
~~~~~~~

For some deployments, keeping a replica set member for dedicated
backup for dedicated backup purposes is operationally
advantageous. Ensure this system is close, from a networking
perspective, to the primary node or likely primary, and that the
:term:`replication lag` is minimal or non-existent. You may wish to
create a dedicated :ref:`hidden node <replica-set-hidden-nodes>` for
the purpose of creating backups.

If this node have journaling enabled, you can safely use standard
:ref:`block level backup methods <block-level-backup>` to create a
backup of this node. Otherwise, if your underlying system does not
support snapshots, you can connect :program:`mongodump` to create a
backup directly from the secondary node. In these cases, use the
:option:`--oplog <mongodump --oplog>` option to ensure a consistent
point-in-time dump of the database state.

.. seealso:: ":doc:`/administration/backups`."

Delayed Nodes
~~~~~~~~~~~~~

:term:`Delayed nodes <delayed node>` are special set members that
function in most cases like other replica set :term:`secondary`
members with the following operational differences: they cannot be
elected primary, do not receive secondary queries, but *do* vote in
:term:`elections <election>` for primary.

Delayed nodes, however, apply operations from the :term:`oplog` on a
delay, to provide running "historical" snapshot of the data set, or a
rolling backup. Typically these nodes are used to protect against
human error, such as deleted databases, dropped collections, or failed
application upgrades or migrations.

See ":ref:`Replica Set Delayed Nodes <replica-set-delayed-nodes>` for
more information about configuring delayed nodes.

Reporting
~~~~~~~~~

Typically :term:`hidden nodes <hidden node>` are used for reporting
purposes, because they are isolated from the cluster, and because no
secondary reads reach the node, they receive no traffic beyond what is
required for replication. While hidden nodes are not electable as
primary, they are still able to *vote* in elections for primary. If
your operational parameters requires this kind of reporting
functionality, see ":ref:`Hidden Replica Set Nodes
<replica-set-hidden-nodes>`" and :js:data:`members[n].hidden` for more
information regarding this functionality.

Cold Standbys
~~~~~~~~~~~~~

For some sets, it may not be possible to initialize a new replica set
member in a reasonable period of time. In these situations, it may be
useful to maintain a secondary with an up to date copy for the express
purpose of replacing another node in the replica set. In most cases,
these nodes can be ordinary members of the replica set, but in large
sets, with varied hardware availability, or given some patterns of
:ref:`geographical distribution <replica-set-geographical-distribution>`,
you may want to use a node with a different :term:`priority`,
:term:`hidden <hidden node>`, or voting status.

Perhaps, your primary nodes have a different hardware specification or
are located on a different network segment from (some) replica
secondaries. In these cases, deploy nodes with :term:`priority` equal
to ``0`` to ensure that they will never become primary. These nodes
will vote in elections for primary, but will never be eligible for
election to primary. Consider likely failover scenarios, such as
inter-site network partitions, and ensure there will be both nodes
that are eligible to be elected primary *and* a quorum of voting
members of the set in the case of a site failure.

.. note::

   If your set already has ``7`` nodes, set the
   :js:data:`members[n].votes` value to ``0`` for these nodes, so that
   they won't vote in elections.

.. seealso:: ":ref:`Secondary Only
   <replica-set-secondary-only-nodes>`," and ":ref:`Hidden Nodes
   <replica-set-hidden-nodes>`.

Arbiter Nodes
-------------

Always deploy an :term:`arbiter` to ensure that a replica set will
have a sufficient number of members to elect a :term:`primary`. While
having replica sets with 2 nodes is not recommended for production
environments, in these circumstances, and *any replica set with an
even number of members*, deploy an arbiter.

To add an arbiter, while connected to the *current primary* node in
the :program:`mongo` shell, issue the following command:

.. code-block:: javascript

   rs.addArb("[hostname]:[port]")

Because arbiters do not hold a copy of the data, they have minimal
resource requirements and do not require dedicated hardware. Do not
add an arbiter to a set if you have an odd number of voting nodes that
hold data, to prevent tied :term:`elections <election>`.

.. seealso:: ":ref:`Arbiter Nodes <replica-set-arbiters>`,"
   ":setting:`replSet`," ":option:`mongod --replSet`, and
   ":js:func:`rs.addArb()`."
