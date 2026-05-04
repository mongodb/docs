Run:

.. code-block:: javascript
   :emphasize-lines: 5

   // Attempt to update one document
   db.medical.updateOne( {
      // User must have the Provider role to perform the update
      $expr: { $ne: [
         { $setIntersection: [ [ "Provider" ], "$$USER_ROLES.role" ] }, []
      ] } },
      // Update diagnosisCode
      { $set: { diagnosisCode: "ACH 01"} }
   )
