// :snippet-start: insert-reportedsales
db.reportedsales.insertMany( [
   { _id: 1, quarter: "2019Q1", region: "A", qty: 400 },
   { _id: 2, quarter: "2019Q1", region: "B", qty: 550 },
   { _id: 3, quarter: "2019Q1", region: "C", qty: 1000 },
   { _id: 4, quarter: "2019Q2", region: "A", qty: 660 },
   { _id: 5, quarter: "2019Q2", region: "B", qty: 500 },
   { _id: 6, quarter: "2019Q2", region: "C", qty: 1200 }
] )
// :snippet-end:
