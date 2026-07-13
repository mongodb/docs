db.movies.explain("queryPlanner").aggregate([
  {
    $search: {
      index: "default",
      range: {
        path: "released",
        gt: ISODate("2015-01-01T00:00:00.000Z"),
        lt: ISODate("2015-12-31T00:00:00.000Z")
      },
      sort: {
        released: -1
      }
    }
  },
  { $limit: 5 },
  {
    $project: {
      _id: 0,
      title: 1,
      released: 1
    }
  }
])