db.moviesWithAutomatedEmbedding.createSearchIndex(
  "autoEmbedIndex",
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
)