.. code-block:: json
   :linenos:
   :copyable: false

   {
     "$schema": "https://json-schema.org/draft/2020-12/schema",
     "type": "object",
     "required": [
       "_id",
       "title",
       "year"
     ],
     "properties": {
       "_id": {
         "$ref": "#/$defs/ObjectId"
       },
       "genres": {
         "type": "array",
         "items": {
           "type": "string"
         }
       },
       "plot": {
         "type": "string"
       },
       "title": {
         "type": "string"
       },
       "year": {
         "type": "integer"
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
