db.weather.aggregate( [
   { $match: { "sensor.sensorId": 5578 } },
   {
      $group: {
         _id: { $dateTrunc: { date: "$time", unit: "day" } },
         avgTemp: { $avg: "$temp" },
      },
   },
   { $sort: { avgTemp: -1 } }
] )