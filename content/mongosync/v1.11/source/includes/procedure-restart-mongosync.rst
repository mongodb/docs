
.. start-restart-procedure-overview

To restart a migration, you must first stop the ongoing ``mongosync`` process.
During the migration process, ``mongosync`` creates databases with 
your data ("user databases") and the ``mongosync_reserved_for_internal_use``
system database on the destination cluster. You must remove those databases 
before restarting ``mongosync``.

.. end-restart-procedure-overview

.. start-restart-procedure-steps

Follow these steps to restart your ``mongosync`` migration.

.. procedure::
   :style: normal

   .. step:: Stop the current ``mongosync`` process

      Stop the ongoing ``mongosync`` process. You can do this by using
      ``Ctrl-C`` or by calling the :ref:`/pause <c2c-api-pause>` endpoint.
   
   .. step:: Use ``mongosh`` to connect to the destination cluster

      Connect to the destination cluster with :binary:`mongosh`. If
      the destination is a sharded cluster, connect to the
      :binary:`mongos` instance. If the destination is a replica set,
      connect to the primary :binary:`mongod` instance.

      If you already have ``mongosh`` installed, run the following
      command to connect to your cluster:

      ``mongosh "mongodb+srv://<my-connection-string>"``
      
   .. step:: Disable write-blocking on your destination cluster

      Use the ``mongosh`` :dbcommand:`setUserWriteBlockMode` database 
      command to disable write-blocking on your destination cluster:

      .. literalinclude:: /code-examples/includes/procedure-restart-mongosync.js
         :language: javascript
         :start-after: start setUserWriteBlockMode example
         :end-before: end setUserWriteBlockMode example

   .. step:: Remove the ``mongosync_reserved_for_internal_use`` database on the destination cluster

      In ``mongosh``, drop the ``mongosync_reserved_for_internal_use`` system
      database:

      .. literalinclude:: /code-examples/includes/procedure-restart-mongosync.js
         :language: javascript
         :start-after: start drop db example
         :end-before: end drop db example
 
   .. step:: Remove any user databases created by ``mongosync`` on the destination cluster
     
      Remove any user databases created on the destination cluster 
      by ``mongosync`` during the previous migration. 

      a. Use ``mongosh`` to list all databases on the destination cluster:
         
         .. literalinclude:: /code-examples/includes/procedure-restart-mongosync.js
            :language: javascript
            :start-after: start show dbs
            :end-before: end show dbs

      #. Remove user databases. The ``admin``, ``local``, and ``config``
         databases are **system databases**. Do not edit these
         system databases without instructions from MongoDB support. 
         
         If the ``show databases`` command lists any user databases on
         the destination cluster, you must remove them.

         Repeat this step for each user database listed by ``show databases``:

         .. literalinclude:: /code-examples/includes/procedure-restart-mongosync.js
            :language: javascript
            :start-after: start drop dbs example
            :end-before: end drop dbs example

      #. Run ``show databases`` again to ensure that all databases have been
         successfully dropped.

   .. step:: (Optional) Enable the balancer on the source and destination clusters

      If you want to completely stop the migration, you can re-enable the
      balancer on the source and destination clusters by running the
      :dbcommand:`balancerStart` command in ``mongosh`` on each cluster.

      The preceding instructions used ``mongosh`` to connect to the destination
      cluster. To enable the balancer on your source cluster, use ``mongosh`` to connect
      to your source cluster and run the following command:

      .. literalinclude:: /code-examples/includes/procedure-restart-mongosync.js
            :language: javascript
            :start-after: start balancerStart example
            :end-before: end balancerStart example

   .. step:: Restart ``mongosync``

      a. Run ``mongosync`` to reconnect to the source and destination clusters.

      #. Use the :ref:`/start <c2c-api-start>` API end point to start syncing.

.. end-restart-procedure-steps