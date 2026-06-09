db.movies_ReleasedAfter2000.aggregate([
  {
    $search: {
      index: "releasedAfter2000Index",
      text: {
        path: "title",
        query: "foo"
      },
      sort: {
        released: 1
      }
    }
  }
])
