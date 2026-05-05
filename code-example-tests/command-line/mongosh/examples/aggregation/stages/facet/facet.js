// :snippet-start: facet
db.movies.aggregate( [
  { $match: { runtime: { $gt: 1000 } } },
  {
    $facet: {
      "categorizedByGenres": [
        { $unwind: "$genres" },
        { $sortByCount: "$genres" }
      ],
      "categorizedByRuntime": [
        {
          $bucket: {
            groupBy: "$runtime",
            boundaries: [ 1000, 1200, 1400 ],
            default: "Other",
            output: {
              "count": { $sum: 1 },
              "titles": { $push: "$title" }
            }
          }
        }
      ],
      "categorizedByYear(Auto)": [
        {
          $bucketAuto: {
            groupBy: "$year",
            buckets: 4
          }
        }
      ]
    }
  }
] )
// :snippet-end:
