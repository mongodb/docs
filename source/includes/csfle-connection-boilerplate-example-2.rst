a. Start mongosh

   Run:
   
   .. code-block:: bash

      mongosh --nodb

   ``--nodb`` means don't connect to a database.

#. Generate a Key String

   Generate a base 64 96-byte string:

   .. code-block:: javascript

      const TEST_LOCAL_KEY = require("crypto").randomBytes(96).toString("base64")

#. Create an Encryption Options Object
   
   To create a client-side field level encryption options object, use
   the ``TEST_LOCAL_KEY`` string from the previous step:

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

#. Create an Encrypted Client Object

   To create an encrypted client object, use the :method:`Mongo()`
   constructor. Replace the ``mongodb://myMongo.example.net`` URI with
   the :ref:`connection string URI <mongodb-uri>` for the target
   cluster. For example:

   .. code-block:: javascript
      :emphasize-lines: 2
         
      encryptedClient = Mongo( 
         "mongodb://myMongo.example.net:27017/?replSetName=myMongo", 
         autoEncryptionOpts
      )
