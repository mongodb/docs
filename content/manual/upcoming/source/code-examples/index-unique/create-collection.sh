db.inventory.insertMany( [
   { _id: 1, product: "pencils", inventory: [ { warehouse: "NYC", quantity: 5 }, { quantity: 10 } ] },
   { _id: 2, product: "pens", inventory: [ { warehouse: "NYC" }, { quantity: 5 } ] },
   { _id: 3, product: "markers", inventory: [ { warehouse: "NYC", quantity: 10 } ] }
] )