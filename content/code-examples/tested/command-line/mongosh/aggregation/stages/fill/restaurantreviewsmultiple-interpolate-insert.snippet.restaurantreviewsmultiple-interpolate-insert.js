db.restaurantReviewsMultiple.insertMany( [
   {
      date: ISODate("2021-03-08"),
      restaurant: "Steve's Pizza",
      score: 90
   },
   {
      date: ISODate("2021-03-08"),
      restaurant: "Sally's Deli",
      score: 75
   }
] )
