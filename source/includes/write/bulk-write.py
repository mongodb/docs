# start-bulk-insert-one
operation = InsertOne(
    namespace="sample_restaurants.restaurants",
    document={
        "name": "Mongo's Deli",
        "cuisine": "Sandwiches",
        "borough": "Manhattan",
        "restaurant_id": "1234"
    }
)
# end-bulk-insert-one

# start-bulk-update-one
operation = UpdateOne(
    namespace="sample_restaurants.restaurants",
    filter={ "name": "Mongo's Deli" },
    update={ "$set": { "cuisine": "Sandwiches and Salads" }}
)
# end-bulk-update-one

# start-bulk-update-many
operation = UpdateMany(
    namespace="sample_restaurants.restaurants",
    filter={ "name": "Mongo's Deli" },
    update={ "$set": { "cuisine": "Sandwiches and Salads" }}
)
# end-bulk-update-many

# start-bulk-replace-one
operation = ReplaceOne(
    namespace="sample_restaurants.restaurants",
    filter={ "restaurant_id": "1234" },
    replacement={
        "name": "Mongo's Pizza",
        "cuisine": "Pizza",
        "borough": "Brooklyn",
        "restaurant_id": "5678"
    }
)
# end-bulk-replace-one

# start-bulk-delete-one
operation = DeleteOne(
    namespace="sample_restaurants.restaurants",
    filter={ "restaurant_id": "5678" }
)
# end-bulk-delete-one

# start-bulk-delete-many
operation = DeleteMany(
    namespace="sample_restaurants.restaurants",
    filter={ "name": "Mongo's Deli" }
)
# end-bulk-delete-many

# start-bulk-write-mixed-collection
operations = [
    InsertOne(
        document={
            "name": "Mongo's Deli",
            "cuisine": "Sandwiches",
            "borough": "Manhattan",
            "restaurant_id": "1234"
        }
    ),
    InsertOne(
        document={
            "name": "Mongo's Deli",
            "cuisine": "Sandwiches",
            "borough": "Brooklyn",
            "restaurant_id": "5678"
        }
    ),
    UpdateMany(
        filter={ "name": "Mongo's Deli" },
        update={ "$set": { "cuisine": "Sandwiches and Salads" }}
    ),
    DeleteOne(
        filter={ "restaurant_id": "1234" }
    )
]

results = restaurants.bulk_write(operations)

print(results)
# end-bulk-write-mixed-collection


# start-bulk-write-mixed-client
operations = [
    InsertOne(
        namespace="sample_mflix.movies",
        document={
            "title": "Minari",
            "runtime": 217,
            "genres": ["Drama", "Comedy"]
        }
    ),
    UpdateOne(
        namespace="sample_mflix.movies",
        filter={ "title": "Minari" },
        update={ "$set": { "runtime": 117 }}
    ),
    DeleteMany(
        namespace="sample_restaurants.restaurants",
        filter={ "cuisine": "French" }
    )
]

results = client.bulk_write(operations)

print(results)
# end-bulk-write-mixed-client

# start-bulk-write-unordered
results = restaurants.bulk_write(operations, ordered=False)
# end-bulk-write-unordered

# start-bulk-write-verbose
results = client.bulk_write(operations, verbose_results=True)
# end-bulk-write-verbose