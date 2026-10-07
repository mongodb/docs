// :snippet-start: create-partial-ttl-index
db.events.createIndex(
   { createdAt: 1 },
   {
      name: "Partial-TTL-Index",
      partialFilterExpression: { type: "click" },
      expireAfterSeconds: 10
   }
)
// :snippet-end:
