============================================
Change the Size of the Operation Log (Oplog)
============================================

.. default-domain:: mongodb

The :term:`oplog`, which supports :term:`replication`, by creating an
:term:`idempotent` operation log that :term:`secondary` members can
use to reproduce all write operations is a :term:`capped
collection`. While the default sizing for the oplog is big enough to
support most usage patterns there are cases that require a differently
sized oplog.

This guide describes the process for changing the size if the default
size is too big or too small for the needs of your deployment.

Background
----------

Most :term:`replica set` deployments will never need to modify the
oplog size. In most cases the default oplog size, which is 5% of total
disk size, [#default-oplog]_ is an acceptable size. If an oplog of
this size fills up in an hour, for instance, the disk will be full in
less then a day (about 20 hours); if the oplog fills up in a day, the
disk will be full in less than a month (about 20 days.)

Some usage patterns, however, indicate a different usage pattern. For
instance, large numbers of multi-updates, a significant portion of
delete operations, and in place updates can generate large numbers in
short periods of time.

Because the :term:`oplog` is a :term:`capped collection` once you have
created an oplog, you cannot modify its size except by using the
procedure outlined in this document.

.. seealso:: ":ref:`Introduction to Oplog Sizing
   <replica-set-oplog-sizing>`."

.. [#default-oplog] The default oplog size is the *greater* of 1
   gigabyte or 5% of total disk size.

Overview
--------

The procedure for changing the size of the oplog is as follows:

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


Procedure
---------

For the purpose of example, this document describes the process of
re-sizing the oplog on a member of the :setting:`rs0 <replSet>`
running on :setting:`port` ``27017`` with a :setting:`data directory
<dbpath>` of ``/srv/mongodb``.

Quarantine the Instance
~~~~~~~~~~~~~~~~~~~~~~~

Issue the following command from your system shell to shutdown the
node:

.. code-block:: sh

   mongod --dbpath /srv/mongodb --shutdown

If this node is the primary this will trigger a failover situation and
another node in the replica set will become primary.

Then restart the instance running on a different port in standalone
(i.e. without :setting:`replSet` or :option:`--replSet <mongod
--replSet>`,) using the following command and the system shell:

.. code-block:: sh

   mongod --port 37017 --dbpath /srv/mongodb

Before continuing, you may want to backup the existing oplog. This
step is entirely optional.

.. code-block:: sh

   mongodump --db local --collection 'oplog.rs' --port 37017

Then, connect to the instance using the :program:`mongo` shell, with
the following command to begin the procedure:

.. code-block:: sh

   mongo --port 37017

Save the Last Oplog Entry
~~~~~~~~~~~~~~~~~~~~~~~~~

In the :program:`mongo` shell, you want to use the ``local`` database,
to interact with the oplog. Issue the following command:

.. code-block:: javascript

   use local

Then, use the following :func:`save()` operation to save the last
entry in the oplog to a temporary collection:

.. code-block:: javascript

   db.temp.save( db.oplog.rs.find().sort( {$natural : -1} ).limit(1).next() )

You can see this oplog entry in the "``temp``" collection by issuing
the following command:

.. code-block:: javascript

   db.temp.find()

Resize the Oplog
~~~~~~~~~~~~~~~~

The following operations assume that you're using the "``local``"
database. Entering "``db``" into the shell will return the name of the
current database. If this does *not* return "``local``", the "``use
local``" command will switch the shell to the "``local``" database.

Drop the Existing Oplog
```````````````````````

Begin by dropping the existing "``oplog.rs``" collection in the
"``local``" database. Use the following command:

.. code-block:: javascript

   db.oplog.rs.drop()

This will return "``true``" on the shell.

Create a New Oplog
``````````````````

Use the :dbcommand:`create` command to create the new oplog.

.. code-block:: javascript

   db.runCommand( { create : "oplog.rs", capped : true, size : 2147483648 } )

Specify the ``size`` argument in bytes. A value of "``2147483648``"
will create a new oplog that's 2 gigabytes. This command will return
the following status upon success:

.. code-block:: javascript

   { "ok" : 1 }

Insert Saved Oplog Entry in New Oplog
`````````````````````````````````````

Issue the following command to save the last entry from the oplog into
the new oplog.

.. code-block:: javascript

   db.oplog.rs.save( db.temp.findOne() )

You can confirm that this entry is in the new oplog with the following
operation:

.. code-block:: javascript

   db.oplog.rs.find()

Congratulations! You have resized the oplog of this instance.

Resart Instance
~~~~~~~~~~~~~~~

Now that the resize operation is complete, issue the following command
sequence to shut down the node and restarted in replica set mode.

.. code-block:: javascript

   mongod --dbpath /srv/mongodb --shutdown
   mongod --replSet rs0 --dbpath /srv/mongodb

The replica member will recover and "catch up," and then will be
eligible for election to :term:`primary`. You can use the following
command on a :program:`mongo` shell connection to the *current*
:term:`primary`.

.. code-block:: javascript

   rs.stepDown()

This will cause the primary to step down and force an election. If
this node's :ref:`priority <replica-set-node-priority>` is higher than
all other nodes in the set *and* it has successfully "caught up," then
it will likely become primary.

Other Replica Set Members
~~~~~~~~~~~~~~~~~~~~~~~~~

You should repeat this procedure for any member of the replica set
that *could* become primary.
