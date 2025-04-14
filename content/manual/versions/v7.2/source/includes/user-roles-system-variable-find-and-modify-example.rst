Run:

.. code-block:: javascript
   :emphasize-lines: 12

   // Attempt to find and modify document
   db.medical.findAndModify( {
      query:
         { $and: [
            {
               // Only update the document for Mary Smith
               patientName: { $eq: "Mary Smith" }
            },
            {
               // User must have the Provider role to perform the update
               $expr: { $ne: [ {
                  $setIntersection: [ [ "Provider" ], "$$USER_ROLES.role" ]
               }, [] ] }
            }
         ]
      },
      // Update document
      update: {
         patientName: "Mary Smith",
         diagnosisCode: "ACH 03",
         creditCard: "6541-7534-9637-3456"
      }
   } )
