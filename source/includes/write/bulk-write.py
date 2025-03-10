# start-bulk-insert-one
operation = pymongo.InsertOne(
    {
        "name": "Mongo's Deli",
        "cuisine": "Sandwiches",
        "borough": "Manhattan",
        "restaurant_id": "1234"
    }
)
# end-bulk-insert-one

# start-bulk-insert-one-typed
class Restaurant (TypedDict):
    name: str
    cuisine: str
    borough: str
    restaurant_id: str

operation = pymongo.InsertOne(Restaurant(
    name="Mongo's Deli", cuisine="Sandwiches", borough="Manhattan", restaurant_id="1234"))
# end-bulk-insert-one-typed

# start-bulk-update-one
operation = pymongo.UpdateOne(
    { "name": "Mongo's Deli" },
    { "$set": { "cuisine": "Sandwiches and Salads" }},
)
# end-bulk-update-one

# start-bulk-update-many
operation = pymongo.UpdateMany(
    { "name": "Mongo's Deli" },
    { "$set": { "cuisine": "Sandwiches and Salads" }},
)
# end-bulk-update-many

# start-bulk-replace-one
operation = pymongo.ReplaceOne(
    { "restaurant_id": "1234" },
    {
        "name": "Mongo's Pizza",
        "cuisine": "Pizza",
        "borough": "Brooklyn",
        "restaurant_id": "5678"
    }
)
# end-bulk-replace-one

# start-bulk-replace-one-typed
class Restaurant (TypedDict):
    name: str
    cuisine: str
    borough: str
    restaurant_id: str

operation = pymongo.ReplaceOne(
    { "restaurant_id": "1234" },
    Restaurant(name="Mongo's Pizza", cuisine="Pizza", borough="Brooklyn", restaurant_id="5678")
)
# end-bulk-replace-one-typed

# start-bulk-delete-one
operation = pymongo.DeleteOne({ "restaurant_id": "5678" })
# end-bulk-delete-one

# start-bulk-delete-many
operation = pymongo.DeleteMany({ "name": "Mongo's Deli" })
# end-bulk-delete-many

# start-bulk-write-mixed
operations = [
    pymongo.InsertOne(
        {
            "name": "Mongo's Deli",
            "cuisine": "Sandwiches",
            "borough": "Manhattan",
            "restaurant_id": "1234"
        }
    ),
    pymongo.InsertOne(
        {
            "name": "Mongo's Deli",
            "cuisine": "Sandwiches",
            "borough": "Brooklyn",
            "restaurant_id": "5678"
        }
    ),
    pymongo.UpdateMany(
        { "name": "Mongo's Deli" },
        { "$set": { "cuisine": "Sandwiches and Salads" }},
    ),
    pymongo.DeleteOne(
        { "restaurant_id": "1234" }
    )
]

results = restaurants.bulk_write(operations)

print(results)
# end-bulk-write-mixed

# start-bulk-write-unordered
results = restaurants.bulk_write(operations, ordered=False)
# end-bulk-write-unordered