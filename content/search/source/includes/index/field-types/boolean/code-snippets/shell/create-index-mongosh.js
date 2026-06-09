// Connect to your Atlas cluster
use sample_analytics;

// Create the search index
db.movies.createSearchIndex(
  "default",
  {
    "mappings": {
      "dynamic": false,
      "fields": {
        "active": {
          "type": "boolean"
        }
      }
    }
});