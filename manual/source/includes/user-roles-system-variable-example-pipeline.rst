Run:

.. code-block:: javascript
   :emphasize-lines: 5

   db.budget.aggregate( [ {
      $match: {
         $expr: {
            $not: {
               $eq: [ { $setIntersection: [ "$allowedRoles", "$$USER_ROLES.role" ] }, [] ]
            }
         }
      }
   } ] )
