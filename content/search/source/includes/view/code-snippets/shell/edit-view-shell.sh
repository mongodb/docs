db.runCommand(
{
    collMod: "movies_ReleasedAfter2000",
    viewOn: "movies",
    "pipeline": [
      {
        $match: {
          $expr: {
            $lt: [
              "$released",
              ISODate("2000-01-01T00")
            ]
          }
        }
      }
    ]
  }
)
