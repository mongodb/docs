// :snippet-start: insert-orders
db.orders.insertMany( [
   { _id: ISODate( "2022-03-18T12:45:20Z" ), "quantity": 50, "totalOrderPrice": 500 },
   { _id: ISODate( "2022-03-18T12:47:00Z" ), "quantity": 5, "totalOrderPrice": 50 },
   { _id: ISODate( "2022-03-18T12:50:00Z" ), "quantity": 1, "totalOrderPrice": 10 }
] )
// :snippet-end:
