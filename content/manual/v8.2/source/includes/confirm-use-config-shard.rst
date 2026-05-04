.. include:: /includes/confirm-sharded-cluster-config-server-intro.rst

The following example runs the ``listShards`` command and tries to find
a document where ``_id`` is set to ``"config"``.

.. code-block:: javascript

   db.adminCommand({ listShards: 1 })["shards"].find(element => element._id === "config")

In this example, the returned document has ``_id`` set to ``"config"`` 
which confirms that this cluster uses a config shard.

.. code-block:: javascript
   :copyable: false
   :emphasize-lines: 2

   {
     _id: "config",
     host: "configRepl/localhost:27018",
     state: 1,
     topologyTime: Timestamp({ t: 1732218671, i: 13 }),
     replSetConfigVersion: Long('-1')
   }
