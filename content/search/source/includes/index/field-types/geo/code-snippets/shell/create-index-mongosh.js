db.listingsAndReviews.createSearchIndex(
    "default",
    {
    "mappings": { 
        "dynamic": false,
        "fields": {
            "address": {
                "fields" : {
                    "location": {
                        "type": "geo",
                        "indexShapes": true
                    } 
                }
            }
        }
    }}
)