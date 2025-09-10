from pymongo import MongoClient

def main():
    # Connect to MongoDB
    uri = "<connection-string>"
    client = MongoClient(uri)

    # set namespace
    database = client["sample_airbnb"]
    collection = database["listingsAndReviews"]
    
    # Create the aggregation pipeline
    pipeline = [
        { "$project": {
            "lastScrapedDate": { "$dateToString": { "format": "%Y-%m-%d", "date": "$last_scraped" } },
            "accomodatesNumber": { "$toString": "$accommodates" },
            "maximumNumberofNights": { "$toString": "$maximum_nights" },
            "propertyName": "$name",
            "propertyType": "$property_type"
          }
        },
        { "$merge": {
            "into": "airbnb_mat_view",
            "whenMatched": "replace"
          }
        }
    ]
    
    # Execute the aggregation
    cursor = collection.aggregate(pipeline)  

    print("Materialized view created!")
    
if __name__ == "__main__":
    main()
