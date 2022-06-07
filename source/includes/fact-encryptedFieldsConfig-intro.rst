To use encrypted fields in a collection, specify a new configuration 
option. You must have permissions to create and modify a collection to 
create or edit this configuration. 

The configuration includes a list of fields and their corresponding key 
identifiers, types, and supported queries.

.. code-block:: javascript

   encryptedFieldsConfig = {
       "fields": [
         {
           "keyId": UUID,                    // required
           "path": String,                   // path to field, required
           "bsonType": "string" | "int" ..., // required
           "queries":                        // optional
           [ 
             { "queryType": "equality" },
           ]
         }
       ],
       "queryPatterns": [                    // optional
          {"fieldName": queryType, "fieldName": queryType, … }
       ]
   }
