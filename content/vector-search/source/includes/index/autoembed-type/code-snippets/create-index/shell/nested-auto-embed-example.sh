db.listingsAndReviews.createSearchIndex(
  "autoembed_index",
  "vectorSearch", 
  {
    "fields": [
      {
        "type": "autoEmbed",
        "modality": "text",
        "path": "reviews.comments",
        "model": "voyage-4",
        "similarity": "cosine",
        "indexingMethod": "hnsw"
      },
      {
        "type": "filter",
        "path": "address.country"
      },
      {
        "type": "filter",
        "path": "bedrooms"
      },
      {
        "type": "filter",
        "path": "property_type"
      },
      {
        "type": "filter",
        "path": "reviews.date"
      }
    ],
    "nestedRoot": "reviews"
  }
);