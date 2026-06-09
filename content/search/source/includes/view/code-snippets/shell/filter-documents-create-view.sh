db.createView(
  "movies_ReleasedAfter2000",
  "movies",
  [
    {
      $match: {
        $expr: {
          $gt: [
            "$released",
            ISODate("2000-01-01")
          ]
        }
      }
    }
  ]
)
