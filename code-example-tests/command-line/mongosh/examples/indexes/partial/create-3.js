db.users.createIndex(
   { name: 1 },
   { partialFilterExpression: { name: { $exists: true } } }
)