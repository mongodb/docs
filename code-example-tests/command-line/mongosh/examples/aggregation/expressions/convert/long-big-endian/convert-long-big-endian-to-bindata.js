// :snippet-start: convert-long-big-endian-to-bindata
db.t.aggregate([
  {
    $project: {
      _id: 0,
      convertedBD: {
        $convert: {
           input: "$a",
           to: "binData",
           byteOrder: "big",
        }
      },
    }
  }
])
// :snippet-end:
