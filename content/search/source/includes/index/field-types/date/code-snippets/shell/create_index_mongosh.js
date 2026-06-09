// Connect to your Atlas cluster
use sample_mflix;

// Create the search index
db.movies.createSearchIndex(
  "default",
  {
    "mappings": {
      "dynamic": false,
      "fields": {
        "released": {
          "type": "date"
        }
      }
    }
});