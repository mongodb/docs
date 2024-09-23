To identify the config server as a config shard, inspect the document in 
the :data:`admin.system.version` collection. In this example, 
``shardName`` is set to ``'config'``:

.. code-block:: javascript
   :copyable: false
   :emphasize-lines: 3

   {
      _id: 'shardIdentity',
      shardName: 'config',
      clusterId: ObjectId("<objectID>"),
      configsvrConnectionString: '<config server replica set connection string>',
   }

The following example retrieves a shard identity document from
:data:`admin.system.version` in the :term:`admin database`:

.. code-block:: javascript

   use admin
   db.system.version.find()

Output extract:

.. code-block:: javascript
   :copyable: false

   {
      _id: 'shardIdentity',
      shardName: 'config',
      clusterId: ObjectId("6441bdd6779584849dcac095"),
      configsvrConnectionString: 'configRepl/localhost:27007'
   }
