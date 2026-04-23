db.embedded_movies.createSearchIndex(
  "hybrid-full-text-search", 
  "search", 
  {
    "mappings": {
      "dynamic": true
    }
  }
);