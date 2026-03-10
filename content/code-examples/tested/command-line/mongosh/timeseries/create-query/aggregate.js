db.weather.aggregate( [
   { $match: { 'sensor.sensorId': 5578, 'sensor.type': 'temperature' } },
   {
      $group: {
         _id: { $dateTrunc: { date: "$time", unit: "day" } },
         avgTemp: { $avg: "$temp" },
      },
   },
   { $sort: { avgTemp: -1 } }
] )