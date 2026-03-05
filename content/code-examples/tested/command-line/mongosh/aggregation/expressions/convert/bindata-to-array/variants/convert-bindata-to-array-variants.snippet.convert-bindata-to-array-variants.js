db.t.aggregate([
  {
    $project: {
      _id: 0,
      original: "$v",
      asArray: {
        $convert: {
          input: "$v",
          to: { type: "array" }
        }
      }
    }
  }
])
