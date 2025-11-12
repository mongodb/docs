db.weather.findOne(
  { time: new Date(2021, 11, 19, 18, 0, 0, 0) },
  { projection: { _id: 0 } }
)
