db.movies.createSearchIndex(
  "vector_index", 
  "vectorSearch", 
  {
    "fields": [
      {
        "type": "autoEmbed",
        "modality": "text",
        "path": "fullplot",
        "model": "voyage-4"
      },
      {
        "type": "filter",
        "path": "genres"
      },
      {
        "type": "filter",
        "path": "year"
      }
    ]
  }
);