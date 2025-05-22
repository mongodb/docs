a. Start mongosh

   Start the ``mongosh`` client.
   
   .. code-block:: bash

      mongosh --nodb

#. Generate Your Key

   To configure Queryable Encryption for a locally managed key, 
   generate a base64-encoded 96-byte string with no line breaks.

   .. code-block:: javascript

      const TEST_LOCAL_KEY = require("crypto").randomBytes(96).toString("base64")

#. Create the Queryable Encryption Options

   Create the Queryable Encryption options using the generated local key string:

   .. code-block:: javascript
      :emphasize-lines: 5

         var autoEncryptionOpts = {
         "keyVaultNamespace" : "encryption.__dataKeys",
         "kmsProviders" : {
            "local" : {
               "key" : BinData(0, TEST_LOCAL_KEY)
            }
         }
         }

#. Create Your Encrypted Client

   Use the :method:`Mongo()` constructor with the queryable 
   encryption options configured to create a database connection. Replace 
   the ``mongodb://myMongo.example.net`` URI with the :ref:`connection 
   string URI <mongodb-uri>` of the target cluster.

   .. code-block:: javascript
      :emphasize-lines: 2
         
      encryptedClient = Mongo( 
         "mongodb://myMongo.example.net:27017/?replSetName=myMongo", 
         autoEncryptionOpts
      )
