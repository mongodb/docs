// :snippet-start: find-by-date
db.orders.find( { _id: { $gt: ISODate( "2022-03-18T12:47:00.000Z" ) } } )
// :snippet-end:
