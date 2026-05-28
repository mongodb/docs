db.createCollection(
   "orders",
   { clusteredIndex: { "key": { _id: 1 }, "unique": true, "name": "orders clustered key" } }
)
