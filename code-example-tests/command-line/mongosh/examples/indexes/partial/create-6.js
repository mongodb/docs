db.users.createIndex(
   { email: 1 },
   { unique: true, partialFilterExpression: { password: { $exists: true } } }
)
