db.users.createIndex(
   { name: 1 },
   { partialFilterExpression: { password: { $exists: true } } }
)