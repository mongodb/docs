db.inventory.insertMany([
  { _id: "apples", qty: 5 },
  { _id: "bananas", qty: 7 },
  { _id: "apricots", qty: 3 },
  { _id: "oranges", qty: { "in stock": 8, "ordered": 12 } },
  { _id: "avocados", qty: "fourteen" }
])
