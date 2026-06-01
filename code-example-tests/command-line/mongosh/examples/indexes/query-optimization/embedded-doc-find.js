// :snippet-start: embedded-doc-find
db.theaters.find(
   { "location.address.city": "Portland" },
   { "location.address.city": 1, _id: 0 }
).limit(1)
// :snippet-end:
