===================================================
Convert a Replica Set to a Replicated Shard Cluster
===================================================

.. default-domain:: mongodb

Overview
--------

This tutorial documents the process for converting a single 3-member
replica set to a shard cluster that consists of 2 shards. Each shard
will consist of an independent 3-member replica set.

The procedure that follows uses a test environment running on a local
system (i.e. localhost) on OS X, but the instructions should run on
any UNIX-like system, including Linux. You should feel encouraged
to "follow along at home."

If you need to perform this process in a production environment, this
document includes notes throughout to indicate procedural
differences.

In brief, the process is as follows:

1. Create or select an existing 3-member replica set, and insert
   some data into a collection.

2. Start the config servers and create a shard cluster with a single
   shard.

3. Create a second replica set with three new :option:`mongod` processes.

4. Add the second replica set to the sharded cluster.

5. Enable sharding on the desired collection or collections.

Process
-------

Install MongoDB for a ":doc:`development or testing environment
</tutorial/install-mongodb-for-testing-and-development>`".

.. note::

   If you're converting an existing production set to a shard cluster,
   install MongoDB for a :doc:`production environment
   </tutorial/install-mongodb-in-production-environments>`.

   If your existing deployment is already a replica set, you can omit
   the next step. If your existing deployment is a standalone
   instance, use :doc:`these instructions to convert a standalone
   instance to a replica set </tutorial/convert-standalone-node-to-shard-cluster>`.

Deploy a Replica Set with Test Data
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Use the following sequence of steps to configure and deploy a replica
set and then insert test data.

1. Create directories for first replica set instance, named firstset:

   - `/data/example/firstset1`
   - `/data/example/firstset2`
   - `/data/example/firstset3`

   Issue the following command: ::

        mkdir -p /data/example/firstset1 /data/example/firstset2 /data/example/firstset3

2. Start three :option:`mongod` instances by running each of the
   following commands in a separate terminal window or GNU Screen
   window: ::

        mongod --dbpath /data/example/firstset1 --port 10001 --replSet firstset --oplogSize 700 --rest
        mongod --dbpath /data/example/firstset2 --port 10002 --replSet firstset --oplogSize 700 --rest
        mongod --dbpath /data/example/firstset3 --port 10003 --replSet firstset --oplogSize 700 --rest

   .. note::

      Here, the ":option:`--oplogSize 700 <mongod --oplogSize>`"
      option restricts the size of the operation log (i.e. oplog) for
      each :option:`mongod` process to 700MB. Without the
      :option:`--oplogSize <mongod --oplogSize>` option, each
      :option:`mongod` will reserve approximately 5% of the free disk
      space on the volume. By limiting the size of the oplog, each
      process will start more quickly. Omit this setting in production
      environments.

3. Connect to one mongodb instance with :option:`mongo` shell by
   running the following command in a new terminal to connect to the
   first node: ::

        mongo localhost:10001/admin

   .. note::

      Above and hereafter, if you are running in a production
      environment or are testing this process with :option:`mongod`
      instances on multiple systems replace "localhost" with a
      resolvable domain, hostname, or the IP address of your system.

4. Initialize the first replica set, using the following command at
   the :option:`mongo` prompt.

   .. code-block:: javascript

      db.runCommand({"replSetInitiate" : {"_id" : "firstset", "members" : [{"_id" : 1, "host" : "localhost:10001"}, {"_id" : 2, "host" : "localhost:10002"}, {"_id" : 3, "host" : "localhost:10003"}]}})
      {
              "info" : "Config now saved locally.  Should come online in about a minute.",
              "ok" : 1
      }

5. Create and populate a new collection. The following JavScript
   function writes one million documents to the collection
   "``test_collection``" in the following form:

   .. code-block:: javascript

      { "_id" : ObjectId("4ed5420b8fc1dd1df5886f70"), "name" : "Greg", "user_id" : 4, "boolean" : true, "added_at" : ISODate("2011-11-29T20:35:23.121Z"), "number" : 74 }

   Use the following sequence of operations from the :option:`mongo` prompt.

   .. code-block:: javascript

      use test
      switched to db test
      people = ["Marc", "Bill", "George", "Eliot", "Matt", "Trey", "Tracy", "Greg", "Steve", "Kristina", "Katie", "Jeff"];
      for(var i=0; i<1000000; i++){
                                   name = people[Math.floor(Math.random()*people.length)];
                                   user_id = i;
                                   boolean = [true, false][Math.floor(Math.random()*2)];
                                   added_at = new Date();
                                   number = Math.floor(Math.random()*10001);
                                   db.test_collection.save({"name":name, "user_id":user_id, "boolean": boolean, "added_at":added_at, "number":number });
                                  }

   Creating and fully replicating one million documents in the
   :option:`mongo` shell may take several minutes depending on your
   system.

Deploy Sharding Infrastructure
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Use the following procedure to deploy the configuration servers, which
store the cluster's metadata.

.. note::

   For development and testing environments, a single config server is
   sufficient, in production environments, use three config
   servers. Because config instances only store the *metadata* for the
   shard cluster, they have minimal resource requirements.

   Nevertheless, these instructions specify creating three config
   servers.

1. Create the following data directories for three :term:`configsrv`
   instances:

   - ``/data/example/config1``
   - ``/data/example/config2``
   - ``/data/example/config3``

   Issue the following command at the system prompt: ::

        mkdir -p /data/example/config1 /data/example/config2 /data/example/config3

2. Start the config servers by ruining the following commands in a
   *separate* terminal window or GNU Screen window: ::

        mongod --configsvr --dbpath /data/example/config1 --port 20001
        mongod --configsvr --dbpath /data/example/config2 --port 20002
        mongod --configsvr --dbpath /data/example/config3 --port 20003

3. Start :option:`mongos` instance by running the following
   command. Run this command in a new terminal window or GNU Screen
   window: ::

        mongos --configdb localhost:20001,localhost:20002,localhost:20003 --port 27017 --chunkSize 1

   .. note::

      If you are using the collection created earlier, or are just
      experimenting with sharding, you can use a small
      :option:`--chunkSize <mongod --chunkSize>` (1MB works well.) The
      default :mongodb:setting:`chunkSize` of 64MB, means that your
      cluster will need to have 64MB of data before the MongoDB's
      automatic sharding begins working. In production environments,
      do not use a small shard size.

   The :mongodb:setting:`configdb` options specify the *configuration servers*
   (e.g. ``localhost:20001``, ``localhost:20002``, and
   ``localhost:2003``). The :option:`mongos` process runs on the default
   "MongoDB" port (i.e. ``27017``), while the databases themselves, in
   this example, are running on ports in the ``30001`` series. In the
   above example, since ``27017`` is the default port, the option
   ":option:`--port 27017 <mongos --port>`" may be omitted. It is
   included here only as an example.

4. Add the first shard in :option:`mongos`. In a new terminal window
   or GNU Screen session, add the first shard, according to the
   following procedure:

   1. Connect to the :option::option:`mongos` with the following command: ::

           mongo localhost:27017/admin

   2. Add the first shard to the cluster, by issuing the
      :dbcommand:`addshard` command as follows:

      .. code-block: javascript

         db.runCommand( { addshard : "firstset/localhost:10001,localhost:10002,localhost:10003" } )

   3. Observe the following message, which denotes success:

      .. code-block: javascript

         { "shardAdded" : "firstset", "ok" : 1 }

Deploy a Second Replica Set
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Use the following procedure to deploy a second replica set. This
closely mirrors the process used to establish the first replica set
above, omitting the test data.

1. Create directories for second replica set instance

   Create the following  data directories for the members of the
   second replica set, named "``secondset``":

   - ``/data/example/secondset1``
   - ``/data/example/secondset2``
   - ``/data/example/secondset3``

2. Start three instances of :option:`mongod` in three new terminal
   windows, with the following commands: ::

        mongod --dbpath /data/example/secondset1 --port 10004 --replSet secondset --oplogSize 700 --rest
        mongod --dbpath /data/example/secondset2 --port 10005 --replSet secondset --oplogSize 700 --rest
        mongod --dbpath /data/example/secondset3 --port 10006 --replSet secondset --oplogSize 700 --rest

   .. note::

      As above, the second replica set uses the smaller
      :mongodb:setting:`oplogSize` configuration. Omit this setting in
      production environments.

3. Connect to one mongodb instance with :option:`mongo` shell, using
   the following command: ::

        mongo localhost:10004/admin

4. Initialize the second replica set, by issuing the following command
   in the :option:`mongo` shell:

   .. code-block: javascript

      db.runCommand({"replSetInitiate" : {"_id" : "secondset", "members" : [{"_id" : 1, "host" : "localhost:10004"}, {"_id" : 2, "host" : "localhost:10005"}, {"_id" : 3, "host" : "localhost:10006"}]}})

      {
           "info" : "Config now saved locally.  Should come online in about a minute.",
           "ok" : 1
      }

5. Add the second replica set to the shard cluster with the following
   procedure. In a connection to the :option:`mongos` instance created
   in the previous step, issue the following sequence of commands:

   .. code-block: javascript

      use admin
      db.runCommand( { addshard : "secondset/localhost:10004,localhost:10005,localhost:10006" } )

   This command will return the following success message:

   .. code-block: javascript

      { "shardAdded" : "secondset", "ok" : 1 }


6. Verify that both shards are properly configured by running the
   :dbcommand:`listshards` command. View this and example output
   below:

   .. code-block: javascript

      db.runCommand({listshards:1})
      {
             "shards" : [
                    {
                           "_id" : "firstset",
                           "host" : "firstset/localhost:10001,localhost:10003,localhost:10002"
                    },
                    {
                           "_id" : "secondset",
                           "host" : "secondset/localhost:10004,localhost:10006,localhost:10005"
                    }
            ],
           "ok" : 1
      }


Enable Sharding
~~~~~~~~~~~~~~~

Sharding in MongoDB must be enabled on *both* the database and
collection levels.

Enabling Sharding on the Database Level
```````````````````````````````````````

Issue the :dbcommand:`enablesharding` command. The "``test``"
argument specifies the name of the database. See the following
example:

.. code-block: javascript

   db.runCommand( { enablesharding : "test" } )
   { "ok" : 1 }


Create an Index on the Shard Key
````````````````````````````````

Create an index on the shard key. The shard key is used by MongoDB to
distribute documents between shards. Once selected the shard key
cannot be changed. Good shard keys:

- will have values that are evenly distributed among all documents,

- group documents that are likely to be accessed at the same time in
  contiguous chunks, and

- allow for effective distribution of activity among shards.

Typically shard keys are compound, comprising of some sort of hash and
some sort of other primary key. Selecting a shard key, depends on your
data set, application architecture, and usage pattern, and is beyond
the scope of this document. For the purposes of this example, we will
shard the "number" key in the data inserted above. This would
typically not a good shard key for production deployments.

Create the index with the following procedure:

.. code-block: javascript

   use test
   db.test_collection.ensureIndex({number:1})


Shard the Collection
````````````````````

Issue the following command to shard the collection:

.. code-block: javascript

   use admin
   db.runCommand( { shardcollection : "test.test_collection", key : {"number":1} })
   { "collectionsharded" : "test.test_collection", "ok" : 1 }

The collection "``test_collection``" is now sharded!

Over the next few minutes the Balancer will begin to redistribute
chunks of documents. You can confirm this activity by switching to the
``test`` database and running :js:func:``db.stats()`` or :js:func:`db.printShardingStatus()`.

Additional documents that are added to this collection will be
distributed evenly between the shards.

Use the following commands in the :option:`mongo` to return these
statics against each cluster:

.. code-block: javascript

   use test
   db.stats()
   db.printShardingStatus()

The output of the :js:func:`db.stats()` command:

.. code-block:: javascript

   {
        "raw" : {
                "firstset/localhost:10001,localhost:10003,localhost:10002" : {
                        "db" : "test",
                        "collections" : 3,
                        "objects" : 973887,
                        "avgObjSize" : 100.33173458522396,
                        "dataSize" : 97711772,
                        "storageSize" : 141258752,
                        "numExtents" : 15,
                        "indexes" : 2,
                        "indexSize" : 56978544,
                        "fileSize" : 1006632960,
                        "nsSizeMB" : 16,
                        "ok" : 1
                },
                "secondset/localhost:10004,localhost:10006,localhost:10005" : {
                        "db" : "test",
                        "collections" : 3,
                        "objects" : 26125,
                        "avgObjSize" : 100.33286124401914,
                        "dataSize" : 2621196,
                        "storageSize" : 11194368,
                        "numExtents" : 8,
                        "indexes" : 2,
                        "indexSize" : 2093056,
                        "fileSize" : 201326592,
                        "nsSizeMB" : 16,
                        "ok" : 1
                }
        },
        "objects" : 1000012,
        "avgObjSize" : 100.33176401883178,
        "dataSize" : 100332968,
        "storageSize" : 152453120,
        "numExtents" : 23,
        "indexes" : 4,
        "indexSize" : 59071600,
        "fileSize" : 1207959552,
        "ok" : 1
   }

The output of the :js:func:`db.printShardingStatus()` command:

.. code-block:: javascript

   --- Sharding Status ---
   sharding version: { "_id" : 1, "version" : 3 }
   shards:
          {  "_id" : "firstset",  "host" : "firstset/localhost:10001,localhost:10003,localhost:10002" }
          {  "_id" : "secondset",  "host" : "secondset/localhost:10004,localhost:10006,localhost:10005" }
   databases:
          {  "_id" : "admin",  "partitioned" : false,  "primary" : "config" }
          {  "_id" : "test",  "partitioned" : true,  "primary" : "firstset" }
                     test.test_collection chunks:
                                                  secondset	5
                                                  firstset	186

   [...]

In a few moments you can run these commands for a second time to
demonstrate that :term:`chunks <chunk>` are migrating from
``firstset`` to ``secondset``.

Congratulations you have converted a replica set into a sharded
cluster where each shard is itself a replica set.
