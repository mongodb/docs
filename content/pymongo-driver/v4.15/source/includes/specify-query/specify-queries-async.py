# start-sample-data
from pymongo import AsyncMongoClient

uri = "<connection string URI>"
client = AsyncMongoClient(uri)

try:
    database = client["sample_fruit"]
    collection = database["fruits"]

    await collection.insert_many([
        { "_id": 1, "name": "apples", "qty": 5, "rating": 3, "color": "red", "type": ["fuji", "honeycrisp"] },
        { "_id": 2, "name": "bananas", "qty": 7, "rating": 4, "color": "yellow", "type": ["cavendish"] },
        { "_id": 3, "name": "oranges", "qty": 6, "rating": 2, "type": ["naval", "mandarin"] },
        { "_id": 4, "name": "pineapple", "qty": 3, "rating": 5, "color": "yellow" },
    ])

    await client.close()

except Exception as e:
    raise Exception("Error inserting documents: ", e)
# end-sample-data

# start-find-comparison
results = collection.find({ "rating": { "$gt" : 2 }})

async for f in results:
    print(f) 
# end-find-comparison
    
# start-find-logical
results = collection.find({ 
    "$or": [
        { "qty": { "$gt": 5 }},
        { "color": "yellow" }
    ]
})

async for f in results:
    print(f)
# end-find-logical

# start-find-array
results = collection.find({
    "type" : { "$size": 2 }
})

async for f in results:
    print(f)
# end-find-array

# start-find-element
results = collection.find( { "color" : { "$exists": "true" }} )

async for f in results:
    print(f)
# end-find-element

# start-find-evaluation
results = collection.find({ "name" : { "$regex" : "p{2,}" }} )

async for f in results:
    print(f)
# end-find-evaluation