Run:

.. code-block:: javascript
   :emphasize-lines: 4

   db.budget.find( {
      $expr: {
         $not: {
            $eq: [ { $setIntersection: [ "$allowedRoles", "$$USER_ROLES.role" ] }, [] ]
         }
      }
   } )
