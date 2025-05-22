Configuring queryable encryption for a locally managed key requires 
specifying a base64-encoded 96-byte string with no line breaks. The 
following operation generates a key that meets the stated requirements 
and loads it into :binary:`~bin.mongosh`:

.. code-block:: bash
   :emphasize-lines: 1

   export TEST_LOCAL_KEY=$(echo "$(head -c 96 /dev/urandom | base64 | tr -d '\n')")
 
   mongosh --nodb

Create the client-side field level encryption object using the
generated local key string:

.. code-block:: javascript
   :emphasize-lines: 5

   var autoEncryptionOpts = {
     "keyVaultNamespace" : "encryption.__keyVault",
     "kmsProviders" : {
       "local" : {
         "key" : BinData(0, process.env["TEST_LOCAL_KEY"])
       }
     }
   }

Use the :method:`Mongo()` constructor to create a database connection
with the queryable encryption options. Replace the 
``mongodb://myMongo.example.net`` URI with the :ref:`connection string
URI <mongodb-uri>` of the target cluster.

.. code-block:: javascript
   :emphasize-lines: 2
   
   encryptedClient = Mongo( 
     "mongodb://myMongo.example.net:27017/?replSetName=myMongo", 
     autoEncryptionOpts
   )
