// :snippet-start: compare-previous-price
db.cakeSales.aggregate( [
  {
    $setWindowFields: {
      partitionBy: "$type",
      sortBy: { orderDate: 1 },
      output: {
        previousPrice: {
          $shift: {
            output: "$price",
            by: -1
          }
        }
      }
    }
  },
  {
    $set: {
      priceComparison: {
        $cond: [
          { $eq: ["$price", "$previousPrice"] },
          "same",
          {
            $cond: [
              { $gt: ["$price", "$previousPrice"] },
              "higher",
              "lower"
            ]
          }
        ]
      }
    }
  },
] )
// :snippet-end:
