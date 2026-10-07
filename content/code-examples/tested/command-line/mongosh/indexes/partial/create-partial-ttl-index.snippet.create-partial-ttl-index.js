db.events.createIndex(
   { createdAt: 1 },
   {
      name: "Partial-TTL-Index",
      partialFilterExpression: { type: "click" },
      expireAfterSeconds: 10
   }
)
