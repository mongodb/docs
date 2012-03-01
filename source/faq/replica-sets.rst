============================================
FAQ: Replica Sets and Replication in MongoDB
============================================

.. default-domain:: mongodb

This provides answers to common questions regarding MongoDB's
replication functionality and :term:`replica set` features.

.. contents:: Frequently Asked Questions:
   :backlinks: none
   :local:

.. seealso:: The following FAQ documents may provide the answers to
   questions that are not addressed here:

   - :doc:`fundamentals`
   - :doc:`developers`
   - :doc:`sharding`
   - :wiki:`Indexing FAQ <Indexing+Advice+and+FAQ>` wiki page

   Additionally the following documentation provides information
   regarding MongoDB's replication support:

   - :doc:`/core/replication`
   - :doc:`/administration/replication-architectures`
   - :doc:`/administration/replica-sets`
   - :doc:`/core/replication-internals`
   - :doc:`/reference/replication-info`
   - :doc:`/reference/replica-configuration`
   - :doc:`/reference/replica-status`

How long does failover take in replica sets?
--------------------------------------------

It may take 10-30 seconds for the other members of the :term:`replica
set` to declare a :term:`primary` as inaccessible or down. This
triggers an :term:`election`.  During this window of time, the cluster
is down for "primary" operations: no write operations are possible,
and :term:`strictly consistent <strict consistency>` reads are not
possible.

.. note::

   :term:`Eventually consistent <eventual consistency>` reads, like the ones that will return
   from a replica set are only possible with a :term:`write concern`
   that permits reads from :term:`secondary` members.

What do the terms "primary" and "master" mean?
----------------------------------------------

:term:`Primary` and :term:`master` are states that a :term:`mongod`
process can have that control if the instance can accept write
operations in a :term:`replica set` or conventional
:term:`master`-:term:`slave` configuration, respectively. MongoDB's
replication is "single-master:" only one node can accept write
operations at a time, to ensure consistency.

In a replica set, if a the current "primary" node fails or becomes
inaccessible, the other members can autonomously :term:`elect
<election>` one of the other members of the set as the new master. In
the default operation, read operations all address the primary;
however, this ":term:`read preference`" is configurable on a
per-connection basis.

What do the terms "secondary" and "slave" mean?
-----------------------------------------------

:term:`Secondary` and :term:`slave` nodes are states that a
:term:`mongod` process can have in :term:`replica sets <replica set>`
or :term:`master`-:term:`slave` replication deployment respectively. This
state indicates that these instances *do not* accept write operations,
and only replicate operations from :term:`primary` or :term:`master`
instances.

Replication operates by way of an :term:`oplog`, from which secondary/slave
members use to apply operations to their own data sets. This process
is asynchronous, and secondary/slave nodes may reflect a previous
state of the database. Frequently the gap between the primary and
secondary is just few milliseconds on a local network connection.

Does replication work over the Internet and WAN connections?
------------------------------------------------------------

Yes.

Some users, have their primary :term:`replica set` members in
U.S. data centers and keep a :term:`secondary` member data center in a
European facility.

.. seealso:: ":doc:`/tutorial/deploy-geographically-distributed-replica-set`"

Can MongoDB replicate over a "noisy" connection?
------------------------------------------------

If the TCP connection between the secondaries and the :term:`primary`
instance breaks, in a :term:`replica set` the set will automatically
elect on of the :term:`secondary` members of the set as primary.

Members of the set will attempt to reconnect to the other members of
the set in response to networking flaps. This does not require
administrator intervention. However, if the network connections
between the nodes in the replica set are very slow, it might not be
possible for the members of the node to keep up with the replication.

What is the preferred replication method: master/slave or replica sets?
-----------------------------------------------------------------------

.. versionadded:: 1.8

:term:`Replica sets <replica set>` are the preferred
:term:`replication` mechanism in MongoDB. However, if your deployment
requires more than 12 nodes, you must use master/slave replication.

What is the preferred replication method: replica sets or replica pairs?
------------------------------------------------------------------------

.. deprecated:: 1.6

:term:`Replica sets <replica set>` replaced :term:`replica pairs` in
version 1.6. :term:`Replica sets <replica set>` are the preferred
:term:`replication` mechanism in MongoDB.

Why use journaling if replication already provides data redundancy?
-------------------------------------------------------------------

:term:`Journaling <journal>` facilitates fast crash recovery and
eliminates the need for :dbcommand:`repairDatabase` or a full resync
from another member in the event of a instance crash, or un-clean
process termination. This is particularly useful for protection
against power failures, if your replica set resides in a single data
center or power circuit, for example.

When a :term:`replica set` runs with journaling, :program:`mongod`
instances can safely restart without any administrator intervention.

.. note::

   Journaling requires some resource overhead for write
   operations. Journaling has no effect on read performance.

   After version 2.0, journaling is active by default on all 64-bit
   builds of MongoDB, and is the recommended mode of operation.

Are write operations durable without :dbcommand:`getLastError`?
---------------------------------------------------------------

Yes.

:dbcommand:`getLastError` or a :term:`write concern` "safe mode,"
simply requires the user to provide clients with feedback regarding
the success or failure of a write operation, and does not affect the
write process itself.

:term:`Write concern` does not affect the write behavior of MongoDB
nor does write concern have any impact on :term:`durability
<journal>`.

What happens when you delete the ``local.*`` files on a replicated instance?
----------------------------------------------------------------------------

Contact the `support forum <http://groups.google.com/group/mongodb-user>`_
as you address this and other related operational issues.

How many arbiters do replica sets need?
---------------------------------------

Some configurations do not require any :term:`arbiter`
instances. Arbiters vote in :term:`elections <election>` for :term:`primary` but
do not replicate data like :term:`secondary` members. Because :term:`replica
sets <replica set>` require a majority of the nodes to elect a primary, arbiters
provide a lightweight method to support the operation set.

There ar a number of possible replica set :doc:`architectures
</administration/replication-architectures>`.

If you have a three node replica set, the set does not require an
arbiter.

A common configuration consists of two normal nodes, one of which is
:term:`primary` and the other is :term:`secondary` as well as an
arbiter for the third node. These configurations make it possible for
set to elect a primary in the even if one node becomes inaccessible.

You may also consider adding an arbiter to a set if it has an equal
number of nodes in two facilities and network partitions between the
facilities are possible. In these cases, the arbiter will help break
the tie between the two facilities and allow the set to elect a new
primary.

.. seealso:: :doc:`/administration/replication-architectures`
