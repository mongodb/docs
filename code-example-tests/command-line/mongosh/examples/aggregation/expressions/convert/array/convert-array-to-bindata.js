// :snippet-start: convert-array-to-bindata
db.t.aggregate([
    {
      $project: {
        _id: 0,
        original: "$a",
        convertedVector: {
          $convert: {
            input: "$a",
            to: { type: "binData" } 
          }
        }
      }
    }
])
// :snippet-end:
