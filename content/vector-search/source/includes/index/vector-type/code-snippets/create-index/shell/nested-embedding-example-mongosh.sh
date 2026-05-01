db.listingsAndReviews.createSearchIndex(
  "vector_index",
  "vectorSearch", 
  {
    "fields": [
      {
        "type": "vector",
        "path": "reviews.comments_embedding",
        "numDimensions": 1024,
        "similarity": "cosine"
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