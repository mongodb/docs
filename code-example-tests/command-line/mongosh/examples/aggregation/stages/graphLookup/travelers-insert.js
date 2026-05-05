// :snippet-start: insert-travelers
db.travelers.insertMany( [
   { _id: 1, name: "Dev", nearestAirport: "JFK" },
   { _id: 2, name: "Eliot", nearestAirport: "JFK" },
   { _id: 3, name: "Jeff", nearestAirport: "BOS" }
] )
// :snippet-end:
