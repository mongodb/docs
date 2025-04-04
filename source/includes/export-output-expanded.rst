.. code-block:: json
   :linenos:
   :copyable: false

   {
     "type": "object",
     "x-bsonType": "object",
     "required": [
       "_id",
       "title",
       "year"
     ],
     "properties": {
       "_id": {
         "$ref": "#/$defs/ObjectId",
         "x-bsonType": "objectId",
         "x-metadata": {
           "hasDuplicates": false,
           "probability": 1,
           "count": 3
         },
         "x-sampleValues": [
           "573a1391f29313caabcd7616",
           "573a1392f29313caabcd9c1b",
           "573a1390f29313caabcd6223"
         ]
       },
       "genres": {
         "type": "array",
         "x-bsonType": "array",
         "x-metadata": {
           "hasDuplicates": true,
           "probability": 0.3333333333333333,
           "count": 1
         },
         "items": {
           "type": "string",
           "x-bsonType": "string",
           "x-metadata": {
             "hasDuplicates": false,
             "probability": 1,
             "count": 2
           },
           "x-sampleValues": [
             "drama",
             "horror"
           ]
         }
       },
       "plot": {
         "type": "string",
         "x-bsonType": "string",
         "x-metadata": {
           "hasDuplicates": false,
           "probability": 0.6666666666666666,
           "count": 2
         },
         "x-sampleValues": [
           "Salome, the daughter of Herodias, seduces her step-father/uncle Herod, ...",
           "Gwen's family is rich, but her parents ignore her and most of the serv..."
         ]
       },
       "title": {
         "type": "string",
         "x-bsonType": "string",
         "x-metadata": {
           "hasDuplicates": false,
           "probability": 1,
           "count": 3
         },
         "x-sampleValues": [
           "Salomè",
           "Payment Deferred",
           "The Poor Little Rich Girl"
         ]
       },
       "year": {
         "type": "integer",
         "x-bsonType": "int",
         "x-metadata": {
           "hasDuplicates": false,
           "probability": 1,
           "count": 3
         },
         "x-sampleValues": [
           1922,
           1932,
           1917
         ]
       }
     },
     "$defs": {
       "ObjectId": {
         "type": "object",
         "properties": {
           "$oid": {
             "type": "string",
             "pattern": "^[0-9a-fA-F]{24}$"
           }
         },
         "required": [
           "$oid"
         ],
         "additionalProperties": false
       }
     }
   }
