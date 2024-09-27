db.embedded_movies.createSearchIndex(
  "rrf-full-text-search", 
  "search", 
  {
    "mappings": {
      "dynamic": false,
      "fields": {
        "title": [{
          "type": "string"
        }]
      }
    }
  }
);
