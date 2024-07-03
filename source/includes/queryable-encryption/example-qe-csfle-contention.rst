The example below sets ``contention`` to 0 for the low cardinality
Social Security Number (SSN) and patient ID fields, since these are
unique identifiers that shouldn't repeat in the data set.

.. code-block:: javascript
   :emphasize-lines: 7,13

   const encryptedFieldsObject = {
      fields: [
         {
            path: "patientId",
            bsonType: "int",
            queries: { queryType: "equality",
                       contention: "0"}
         },
         {
            path: "patientInfo.ssn",
            bsonType: "string",
            queries: { queryType: "equality",
                       contention: "0"}
         },
         {
            path: "medications",
            bsonType: "array"
         },
         {
            path: "patientInfo.billing",
            bsonType: "object"
         }
      ]
   }

.. Example context from Kenn White:
.. - full name (unencrypted, ~750 possible values)
.. - mobile (encrypted, high cardinality)
.. - SSN (encrypted, high cardinality)
.. - Address (unencrypted,high cardinality)
.. - DOB between 1930-1990 (unencrypted, ~22K values)
.. - gender (encrypted, Male/Female/Non-binary)
.. - creditCard.type (encrypted, 4 types)
.. - creditCard.expiry (encrypted, ~84 possible values)