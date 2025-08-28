db.movies_ReleasedAfter2000.createSearchIndex(
  "releasedAfter2000Index",
  {
    "mappings": {
      "dynamic": true
    }
  }
)
