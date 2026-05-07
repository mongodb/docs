db.movies.createSearchIndex(
  "autoembed_index", 
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