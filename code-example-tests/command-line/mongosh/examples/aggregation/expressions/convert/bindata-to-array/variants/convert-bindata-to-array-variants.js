// :snippet-start: convert-bindata-to-array-variants
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
// :snippet-end:
