db.t.aggregate([
  {
    $project: {
      _id: 0,
      convertedBD: {
        $convert: {
           input: "$a",
           to: "binData",
        }
      },
    }
  }
])
