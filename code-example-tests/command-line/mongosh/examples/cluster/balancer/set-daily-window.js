db.settings.updateOne(
   { _id: "balancer" },
   { $set: { activeWindow : { start : "10:00", stop : "18:00" } } },
   { upsert: true }
)