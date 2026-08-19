db.listingsAndReviews.aggregate([
  {
    "$vectorSearch": {
      "index": "autoembed_index",
      "path": "reviews.comments",
      "filter": {
        "reviews.date": { "$gte": ISODate("2010-01-01") }
      },
      "parentFilter": {
        "address.country": { "$in": ["United States"] },
        "bedrooms": { "$gte": 2,  "$lte": 3 }, 
        "property_type": { "$in": ["Apartment", "House"] }
      },
      "query": {
        "text": "great location close to everything"
      },
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