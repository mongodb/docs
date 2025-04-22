The Social Security Number (SSN) and patient identifier fields are high
:term:`cardinality` fields that contain unique values in a data set. For
high cardinality fields, you can set ``contention`` to a low value. The
following example sets ``contention`` to ``0`` for the ``patientId`` and
``patientInfo.ssn`` fields:

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
         ...
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
