.. code-block:: javascript

   db.inventory.insertMany( [
      {
         "item": "nuts", "quantity": 30,
         "carrier": { "name": "Shipit", "fee": 3 }
      },
      {
         "item": "bolts", "quantity": 50,
         "carrier": { "name": "Shipit", "fee": 4 }
      },
      {
         "item": "washers", "quantity": 10,
         "carrier": { "name": "Shipit", "fee": 1 }
      }
   ] )
