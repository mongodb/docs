db.users.createIndex(
   { name: 1 },
   { partialFilterExpression: { email: { $exists: true } } }
)
