=========================================
Application Development with Replica Sets
=========================================

.. default-domain:: mongodb

From the perspective of the client applications, whether a MongoDB
instance is a single server (i.e. "standalone") or a replica set is
mostly irrelevant. While specific configuration depends to some extent
on the client :doc:`drivers </applications/drivers>`, there is often
minimal or no differences between applications running with
:term:`replica sets <replica set>` or standalone instances.

This document, however, addresses several topics that will help
application developers take advantage of replica sets.

.. _replica-set-write-concern:

Write Concern
-------------

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

You may also specify "``w: 2``" so that the write operation replicates
to a second node before the command returns.

.. note::

   :dbcommand:`getLastError` assumes the current host,
   therefore, "``w: 2``" waits until the :term:`primary` and one other
   member of the replica set commits the write operation. The current
   primary always counts as "``w: 1``".

You can also configure a "default" :dbcommand:`getLastError` behavior on the
replica set configuration. For instance:

.. code-block:: javascript

   cfg = rs.conf()
   cfg.settings.getLastErrorDefaults = "w: majority, fsync: false, j: true"
   rs.reconfig(cfg)

TODO: Incorrect getLastErrorDefaults setting:
   cfg.settings.getLastErrorDefaults = {w: "majority", fsync: false, j: true}


When the new configuration is active, the effect of the
:dbcommand:`getLastError` operation will wait until the write
operation has succeeded on a majority of the nodes before writing. By
specifying "``fsync: false``" and "``j: true``" a successful commit of
the operation to the journal is all that :dbcommand:`getLastError`
requires to return succesullly, rather than a full flush to disk. Use this the
:data:`getLastErrorDefaults`" setting on the sever level to define the
standards for a set-wide "safe mode." The default setting will only
affect :dbcommand:`getLastError` commands with *no* other
arguments.

.. _replica-set-read-preference:

Read Preference
---------------

By default, clients will direct reads to the :term:`primary` node in a
cluster. To distribute reads to :term:`secondary` nodes, most drivers
allow you to set a ``readPreference`` value for the current session.

Issue the following command in the :program:`mongo` shell to enable
secondary reads:

.. code-block:: javascript

     rs.slaveOk()

Clients set :term:`read preference` on a per-connection
basis. See ":func:`rs.slaveOk()`" for more information.

Because secondary nodes are not guaranteed to be consistent with the
state of the primary nodes, setting a read preference that allows
reading from secondary nodes, accepts :term:`eventually consistent
<eventual consistency>` read operations. Do not allow secondary reads,
unless you can accept this eventual consistency.

While read preference controls the consistency of query results from a
replica set, used in combination with sufficiently strict :ref:`write
propagation <replica-set-write-concern>` policies a replica set
can be totally consistent.

.. note::

   See the documentation for the :term:`driver` you are using to
   interact with MongoDB, regarding the use and default read
   preference settings.
