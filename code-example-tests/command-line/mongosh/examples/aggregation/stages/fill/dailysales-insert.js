// :snippet-start: dailysales-insert
db.dailySales.insertMany( [
   {
      "date": ISODate("2022-02-02"),
      "bootsSold": 10,
      "sandalsSold": 20,
      "sneakersSold": 12
   },
   {
      "date": ISODate("2022-02-03"),
      "bootsSold": 7,
      "sneakersSold": 18
   },
   {
      "date": ISODate("2022-02-04"),
      "sneakersSold": 5
   }
] )
// :snippet-end:
