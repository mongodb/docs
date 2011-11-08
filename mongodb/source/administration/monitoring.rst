==================
Monitoring MongoDB
==================

Monitoring is a crucial component of all database administration
work. A firm grasp of MongoDB's monitoring capabilities will enable
you to effectively assess and maintain your deployment proactively,
and also efficiently diagnose any issues that you encounter. This
document provides an overview of the tools you may use for monitoring
MongoDB, an introduction to diagnostic strategies, and suggestions for
monitoring instances in MongoDB's replica sets and shard clusters.

.. seealso::

   For more information about monitoring tools, see:

   - :doc:`/utilities/mongostat`.
   - :doc:`/utilities/mongotop`.

   For more background on various other MongoDB status outputs see:

   - :doc:`/reference/server-status`
   - :doc:`/reference/replica-status`
   - :doc:`/reference/database-statistics`
   - :doc:`/reference/collection-statistics`

   10gen provides a hosted monitoring service which collects and
   aggregates these data to provide insight into the performance and
   operation of MongoDB deployments. See the `MongoDB Monitoring
   Service (MMS) <http://mms.10gen.com/>`_ and the `MMS documentation
   <http://mms.10gen.com/help/>`_ for more information.

Monitoring Tools
----------------

MongoDB provides a number of ways to collect data about the state and
condition of a running MongoDB instance. Each method provides a
different set of information, and is useful in a different
context. This section provides an overview of these utilities and
statistics, along with an example of the kinds of questions that each
method is most suited to help you address.

Utilities
~~~~~~~~~

The MongoDB distribution includes a number of binary programs that are
useful for quickly returning statistics about the instances
performance and activity. These are typically useful for diagnosing
current issues with the database.

mongotop
````````

:command:`mongotop` tracks and reports the current read and write
activity of a MongoDB instance. ``mongotop`` provides per-collection
visibility into use. Use ``mongotop`` to verify that activity and use
match expectations.

monostat
````````

:command:`mongostat` captures and returns counters of database
operations. ``mongostat`` reports operations on a per-type
(e.g. insert, query, update, delete, etc.) basis that makes it easy to
understand the nature of the load on the server. Use ``mongostat`` to
understand the distribution of operation types and to inform capacity
development plans.

Statistics
~~~~~~~~~~

The MongoDB interface provides a number of commands that return
statistics about the state of the MongoDB instance. These commands
useful for capturing the state of the MongoDB instance and can be used
by scripts and programs to develop custom alerts, or modify the
behavior of your application in response to the activity of your
instance.

serverStatus
````````````

Return the :doc:`serverStatus data </reference/server-status/>` using
the :mongodb:command:`serverStatus` command. The document returned
contains a general overview of the state of the database, including
disk usage, memory use, connection, journaling, access. The command is
quick to run and does not impact the performance of your MongoDB
instance.

Most data regarding the state of a MongoDB instance is derived from
``serverStatus``: while you probably don't want to run this command
directly to assess the status of a MongoDB instance, it's a good idea
to be familiar with the data provided by :mongodb:command:`serverStatus`.

replStats
`````````

View the :doc:`replStatus data </reference/replica-status/>` with
the :mongodb:command:`replStatus` command. The returned document
contains

dbStats
```````



collStats
`````````

Diagnosing Performance Issues
-----------------------------

Replication and Monitoring
--------------------------

Sharding and Monitoring
------------------------

