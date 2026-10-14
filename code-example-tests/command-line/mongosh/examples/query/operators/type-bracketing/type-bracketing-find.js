// :snippet-start: type-bracketing
(
  // :snippet-start: load
  db.inventory.insertMany([
    { _id: "apples", qty: 5 },
    { _id: "bananas", qty: 7 },
    { _id: "apricots", qty: 3 },
    { _id: "oranges", qty: { "in stock": 8, "ordered": 12 } },
    { _id: "avocados", qty: "fourteen" }
  ])
  // :snippet-end:
  ,
  // :snippet-start: find
  db.inventory.find( { qty: { $gt: 4 } } )
  // :snippet-end:
)
// :snippet-end:
