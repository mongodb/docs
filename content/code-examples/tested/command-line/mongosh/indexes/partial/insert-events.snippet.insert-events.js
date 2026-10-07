db.events.insertMany( [
   { createdAt: new Date(), type: "view" },
   { createdAt: new Date(), type: "click" }
] )
