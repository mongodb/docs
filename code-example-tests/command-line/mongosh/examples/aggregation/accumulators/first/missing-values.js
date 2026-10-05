// :snippet-start: missing-values
(
   // :snippet-start: missing-values-insert
   db.badData.insertMany( [
      { "_id": 1, "price": 6, "quantity": 6 },
      { "_id": 2, "item": "album", "price": 5, "quantity": 5 },
      { "_id": 7, "item": "tape", "price": 6, "quantity": 6 },
      { "_id": 8, "price": 5, "quantity": 5 },
      { "_id": 9, "item": "album", "price": 3, "quantity": '' },
      { "_id": 10, "item": "tape", "price": 3, "quantity": 4 },
      { "_id": 12, "item": "cd", "price": 7 }
   ] )
   // :snippet-end:
   ,
   // :snippet-start: missing-values-query
   db.badData.aggregate( [
      { $sort: { item: 1, price: 1 } },
      {
         $group: {
            _id: "$item",
            inStock: { $first: "$quantity" }
         }
      }
   ] )
   // :snippet-end:
)
// :snippet-end:
