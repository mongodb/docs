# start-delete-one
query_filter = { "name": "Ready Penny Inn" }

result = restaurants.delete_one(query_filter)
# end-delete-one

# start-delete-many
query_filter = { "borough": "Brooklyn" }

result = restaurants.delete_many(query_filter)
# end-delete-many

# start-delete-options
query_filter = { 'name': {'$regex': 'Mongo' }}

result = restaurants.delete_many(query_filter, comment="Deleting Mongo restaurants")
# end-delete-options