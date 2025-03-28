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

results = await restaurants.bulk_write(operations)

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

results = await client.bulk_write(operations)

print(results)
# end-bulk-write-mixed-client

# start-bulk-write-unordered
results = await restaurants.bulk_write(operations, ordered=False)
# end-bulk-write-unordered

# start-bulk-write-verbose
results = await client.bulk_write(operations, verbose_results=True)
# end-bulk-write-verbose