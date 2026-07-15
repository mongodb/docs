db.embedded_movies.createSearchIndex(
  "hybrid-vector-search", 
  "vectorSearch", 
  {
    "fields": [
      {
        "type": "autoEmbed",
        "modality": "text",
        "path": "fullplot",
        "model": "voyage-4"
      }
    ]
  }
);