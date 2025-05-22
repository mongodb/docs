To configure client-side field level encryption for a locally managed
key:

- generate a base64-encoded 96-byte string with no line breaks
- use :binary:`mongosh` to load the key

.. code-block:: bash
   :emphasize-lines: 1

   export TEST_LOCAL_KEY=$(echo "$(head -c 96 /dev/urandom | base64 | tr -d '\n')")

   mongosh --nodb

Create the client-side field level encryption object using the
generated local key string:

.. code-block:: javascript
   :emphasize-lines: 5

    var autoEncryptionOpts = {
      "keyVaultNamespace" : "encryption.__dataKeys",
      "kmsProviders" : {
        "local" : {
          "key" : BinData(0, process.env["TEST_LOCAL_KEY"])
        }
      }
    }

Use the :method:`Mongo()` constructor with the client-side field level 
encryption options configured to create a database connection. Replace 
the ``mongodb://myMongo.example.net`` URI with the :ref:`connection 
string URI <mongodb-uri>` of the target cluster.

.. code-block:: javascript
   :emphasize-lines: 2
      
   encryptedClient = Mongo( 
     "mongodb://myMongo.example.net:27017/?replSetName=myMongo", 
      autoEncryptionOpts
   )
