db.weather.find(
  {
    $and:
    [
      {
        time:
        {
          $gte: new Date(2021, 11, 18, 0, 0, 0, 0)
        }
      },
      {
        time:
        {
          $lt: new Date(2021, 11, 19, 0, 0, 0, 0)
        }
      }
    ],
  },
  {
    projection:
    {
      _id: 0
    }
  }
)
