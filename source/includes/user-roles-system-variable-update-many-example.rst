Run:

.. code-block:: javascript
   :emphasize-lines: 5

   // Attempt to update many documents
   db.medical.updateMany(
      // User must have the Provider role to perform the update
      { $expr: { $ne: [ {
         $setIntersection: [ [ "Provider" ], "$$USER_ROLES.role" ] }, []
      ] } },
      // Update diagnosisCode
      { $set: { diagnosisCode: "ACH 02"} }
   )
