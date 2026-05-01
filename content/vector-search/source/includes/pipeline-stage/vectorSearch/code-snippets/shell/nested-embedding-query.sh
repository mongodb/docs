db.listingsAndReviews.aggregate([
  {
    "$vectorSearch": {
      "index": "vector_index",
      "filter": {
        "reviews.date": { "$gte": ISODate("2010-01-01") }
      },
      "parentFilter": {
        "address.country": { "$in": ["United States"] },
        "bedrooms": { "$gte": 2,  "$lte": 3 }, 
        "property_type": { "$in": ["Apartment", "House"] }
      },
      "path": "reviews.comments_embedding",
      "queryVector": GREAT_LOCATION_EMBEDDING,
      "numCandidates": 100,
      "limit": 5,
      "nestedOptions": {
        "scoreMode": "avg"
      }
    }
  },
  {
    "$project": {
      "_id": 0,
      "name": 1,
      "address": 1,
      "neighborhood_overview": 1,
      "bedrooms": 1,
      "property_type": 1,
      "reviews.comments": 1,
      "score": { "$meta": "vectorSearchScore" }
    }
  }
])