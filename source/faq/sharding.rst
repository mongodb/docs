==========================
FAQ: Sharding with MongoDB
==========================

.. default-domain:: mongodb

This provides answers to common questions regarding horizontal scaling
and MongoDB's :term:`sharding` functionality.

.. contents:: Frequently Asked Questions:
   :backlinks: none
   :local:

.. seealso:: The following FAQ documents may provide the answers to
   questions that are not addressed here:

   - :doc:`fundamentals`
   - :doc:`developers`
   - :doc:`replica-sets`
   - :wiki:`Indexing FAQ <Indexing+Advice+and+FAQ>` wiki page

Is sharding appropriate for a new deployment?
---------------------------------------------

Many most cases, no.

Unless your data set is too big to fit on single servers, begin with
unsharded environments .

Converting an unsharded database to a :term:`shard cluster` is easy
and seamless, so there is *little advantage* to configuring sharding
while your data set is small.

In any case, new production deployments should use :term:`replica sets
<replication>` to provide high availability and disaster recovery.

How does sharding work with replication?
----------------------------------------

Each :term:`shard` is a logical collection of partitioned data.

A single :program:`mongod` instance or preferably, an independent
:term:`replica set` can hold the data for every shard.

What happens to unsharded collections in sharded databases?
-----------------------------------------------------------

In the current implementation, all databases in a :term:`shard
cluster` have a "primary :term:`shard`." Any collection that is not
sharded resides in its entirety on the primary shard for its
database.

Future versions will distributed un-sharded collections to
different shards so that collections may reside on any *single*
shard.

When will MongoDB distribute data to multiple shards?
-----------------------------------------------------

MongoDB :term:`sharding` is range based. As a result, all documents in
a collection belong to a :term:`chunk`. Migrations, which distribute
chunks among :term:`shards <shard>`, only occur when there are
multiple chunks and an unequal distribution of chunks among shards.

In the current implementation, the default chunk size is 64 megabytes,
which means the collection must have at least 64 megabytes before a
migration will occur.

What happens if a client updates a document in a chunk during a migration?
--------------------------------------------------------------------------

The :program:`mongos` routes the operation to the "old" shard, where
it will succeed immediately. Then the :term:`shard` :program:`mongod`
instances will replicate the modification to the "new" shard before
the :term:`shard cluster` updates that chunk's "ownership," which
effectively finalizes the migration process.

What happens to queries if a shard is inaccessible or slow?
-----------------------------------------------------------

If a :term:`shard` is inaccessible or unavailable, queries will return
with an error, query will return an error unless the client sets the
"Partial" query option. Conversely, if a shard is responding slowly,
:program:`mongos` will wait for the shard to return results.

:program:`mongos` does not return partial results unless specifically
configured.

How does MongoDB distribute queries among shards?
-------------------------------------------------

The exact method for distributing queries among a :term:`shard
cluster` depends on the nature of the query and the configuration of
the shard cluster. Consider a sharded collection, using the
:term:`shard key` "``X``", that has "``Y``" and "``Z``" attributes:

- For a query that selects "``X``" and also sorts by "``X``":

  :program:`mongos` can make a straightforward translation of this
  operation into a series of queries against successive shards,
  ordered by "``X``".  This is faster than querying all shards in
  parallel because :program:`mongos` can determine which shards
  contain the relevant chunks without waiting for all shards to return
  results.

- For queries that select on "``X``" and sorts by "``Y``":

  :program:`mongos` executes queries in parallel on
  the appropriate shards, and performs a merge-sort on the "``Y``" key
  of all documents returned from the shards.

- For queries that select on "``Y``:

  These queries must run on all shards:

  - When query sorts by "``X``, :program:`mongos` serializes the query
    over the shards in ordered by "``X``".

  - If the query sorts by "``Z``", :program:`mongos` must parallelize
    the query over the shards and perform a merge-sort on the "``Z``"
    of the documents found.

How does MongoDB sort queries in sharded environments?
------------------------------------------------------

If you specify call the :func:`sort()` method on a query in a sharded
environment, the :program:`mongod` for each shard will sort its
results, and the :program:`mongos` merges the sort before returning
the result to the client.

What methods are available for administering sharded collections?
-----------------------------------------------------------------

All operations available for administration of un-sharded systems are
available for :term:`sharded <sharding>` collections.

How does MongoDB ensure a unique shard key when using a shard key  *other* than ``_id``?
----------------------------------------------------------------------------------------

If you do not use ``id`` as the shard key, then your
application/client layer must be responsible for keeping the ``_id``
field unique. It is extremely problematic if collections have
duplicate ``_id`` values.

The current best practice for collects that are not sharded by the
"``_id``" field is to use an identifier that will always be unique,
such as a :wiki:`BSON ObjectID <Object+IDs>` for the ``_id`` field.

After sharding, why is all the data still on one server?
--------------------------------------------------------

Ensure that you have declared a :term:`shard key` for your
collections. Until you have configured the shard key, MongoDB will not
create :term:`chunks <chunk>` and :term:`sharding` will not occur.

In the current implementation, the default chunk size is 64 megabytes,
which means the collection must have at least 64 megabytes before a
migration will occur. Additionally, the system which balances chunks
among the servers attempts to avoid superfluous migrations. Depending
on the number of shards, your shard key, and the amount of data, your
system may require at least 10 chunks or even 2 gigabytes of data to
trigger migrations.

:func:`db.printShardingStatus()` reports the number of chunks present
in your cluster.

Is it safe to remove old files in the :dbcommand:`moveChunk` directory?
-----------------------------------------------------------------------

Yes, :program:`mongod` creates these files as backups during normal
:term:`shard` balancing operations.

Once these migrations are complete, you may feel free to delete these
files. The cleanup process is currently manual so please do take care
of this to free up space.

How many connections does each :program:`mongos` need?
------------------------------------------------------

Typically, :program:`mongos` uses one connection from each client, as
well as one outgoing connection to each shard, or each member of the
replica set that backs each shard.

Why does :term:`mongos` hold connections?
-----------------------------------------

:program:`mongos` uses a set of connection pools to communicate to
each :term:`shard` or :term:`replica set` backed shard.  These pools
of connections do not shrink when the number of clients
decreases.

This can lead to an unused :program:`mongos` with a large number open
of connections because of past use.

Where does MongoDB report on connections used by :program:`mongos`?
-------------------------------------------------------------------

Connect to the :program:`mongos` with the :program:`mongo` shell, and
run the following command:

.. code-block:: sh

   db._adminCommand("connPoolStats");

What is ``writebacklisten`` in the log and :func:`currentOp()`?
---------------------------------------------------------------

"Write back listeners" are a component of the communications between
:term:`shards <shard>` and the :term:`config database`. If you see
these operations in the output of :func:`currentOp` or in the "slow"
operations, this is part of the normal operation. The writeback
listener performs long operations by design, so it can appear in the
slow logs even in normal operation.

How should administrators deal with failed migrations?
------------------------------------------------------

Failed migrations require administrative intervention. Chunk moves are
consistent and deterministic.

If the migration fails to complete for some reason, the :term:`shard
cluster` will retry. When the migration completes successfully the
data will reside only on the new shard.

What is the process for moving, renaming, or changing the number of config servers?
-----------------------------------------------------------------------------------

.. seealso:: The wiki page that describes this process: ":wiki:`Changing Configuration Servers <Changing+Config+Servers>`."

When do the :program:`mongos` servers pickup config server changes?
-------------------------------------------------------------------

:program:`mongos` instances maintain a cache of the :term:`config database`
that holds the metadata for the :term:`shard cluster`. This meta data
includes :term:`chunk` placement on :term:`shards <shard>`.

Periodically, and during specific events, :program:`mongos` updates
this cache. There is not way to control this behavior from the client,
but you can use the :dbcommand:`flushRouterConfig` when logged into a
specific :program:`mongos` to force this instance to reload its
configuration.

Is it possible to quickly update :program:`mongos` servers after updating a replica set configuration?
------------------------------------------------------------------------------------------------------

The :program:`mongos` instances will detect these changes without
intervention over time. However, if you want to force the
:program:`mongos` to reload its configuration, use the
:dbcommand:`flushRouterConfig` to each :program:`mongos` directly.

What does setting ``maxConns`` do on :program:`mongos`?
-------------------------------------------------------

The :setting:`maxConns` option limits the number of connections
accepted by :program:`mongos`.

If your client driver or application create a large number of
connections but allows them to timeout rather than closing them
explicitly, then it might make sense to limit the number of
connections at the :program:`mongos` layer.

Set :setting:`maxConns` to a value that is slightly higher than the
maximum number of connections that the client creates, or the maximum
size of the connection pool. This setting prevents the
:program:`mongos` from sending connection spikes from to the
:term:`shards <shard>`, which can disrupt the operation and memory
allocation of the :term:`shard cluster`.
