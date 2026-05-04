If your cluster has a config shard and you need to downgrade the
:ref:`feature compatibility version <view-fcv>` to earlier than 8.0,
connect to ``mongos`` and perform this procedure:

.. procedure::
   :style: normal

   .. step:: Configure a config shard to run as a dedicated config server.

      To begin configuring a config shard to run as a dedicated config
      server, run :dbcommand:`transitionToDedicatedConfigServer`:

      .. code-block:: javascript

         db.adminCommand( { 
            transitionToDedicatedConfigServer: 1
         } )

   .. step:: List all of the databases and collections in the cluster.

      a. To list all the databases in the cluster, run 
         :dbcommand:`listDatabases`:

         .. code-block:: javascript

            db.adminCommand( { listDatabases: 1, nameOnly: true } )

         Exclude ``admin`` and ``config`` databases. 

      #. For each database, list all of the collections in the database.

         To list all of the collections in the database, run
         :dbcommand:`listCollections`.

         .. code-block:: javascript

               db.adminCommand(
                  { 
                     listCollections: 1, 
                     nameOnly: true,
                     filter: { type: { $ne: "view" } }
                  }
               )

         Exclude collections starting with ``system``. 

   .. step:: For each non-system collection, move the collection to a new shard.

      To move the collection to a new shard, run 
      :dbcommand:`moveCollection`:

      .. code-block:: javascript

         db.adminCommand(
            {
               moveCollection: "<database>.<collection>",
               toShard: "<new shard>",
            }
            )

   .. step:: Wait for balancer to move sharded collection data off config server.

      To verify the balancer has moved sharded collection data off the
      config server, run ``transitionToDedicatedConfigServer`` again:

      .. code-block:: javascript

         db.adminCommand( { 
            transitionToDedicatedConfigServer: 1
         } )

      The response after a successful data move contains ``state:
      "completed"``. If the response contains 
      ``state: "pendingDataCleanup"``, wait a moment then continue 
      calling ``transitionToDedicatedConfigServer`` until the command 
      response contains ``state: "completed"``. For full response 
      details, see :dbcommand:`removeShard`.

   .. step:: Set the feature compatibility version.

      To set the feature compatibility version, run 
      :dbcommand:`setFeatureCompatibilityVersion`:

      .. code-block:: javascript

         db.adminCommand( { setFeatureCompatibilityVersion: "7.0" } )
