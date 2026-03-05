// :snippet-start: insert-bindata-variants
db.t.insertMany([
  // Empty PACKED_BIT vector converts to empty array
  { v: BinData(9, "EAA=") },

  // PACKED_BIT vector converts to bool array
  { v: BinData(9, "EAB/Bw==") },

  // INT8 vector converts to int array
  { v: BinData(9, "AwAAAQ==") },

  // FLOAT32 vector converts to double array
  { v: BinData(9, "JwCamZk+") },

  // FLOAT32 vector with special values converts to [-Infinity, 0, Infinity]
  { v: BinData(9, "JwAAAID/AAAAAAAAgH8=") }
])
// :snippet-end:
