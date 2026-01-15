db.users.createIndex(
   { name: 1 },
   { name: "name_partial_unique_idx", unique: true, partialFilterExpression: { password: { $exists: true } } }
)