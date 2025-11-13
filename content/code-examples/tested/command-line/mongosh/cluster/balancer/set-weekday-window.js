db.settings.updateOne(
   { _id: "balancer" },
   { $set: { activeWindowDOW : [
      { day: "Monday", start : "09:00", stop : "17:00" },
      { day: "Tuesday", start : "09:00", stop : "17:00" },
      { day: "Wednesday", start : "09:00", stop : "17:00" },
      { day: "Thursday", start : "09:00", stop : "17:00" },
      { day: "Friday", start : "09:00", stop : "17:00" },
      { day: "Saturday", start : "00:00", stop : "23:59" },
      { day: "Sunday", start : "00:00", stop : "23:59" }
   ]}},
   { upsert: true }
)