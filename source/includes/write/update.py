# start-update-one
restaurants = database["restaurants"]

query_filter = {'name' : 'Bagels N Buns'}
update_operation = { '$set' : 
    { 'name' : '2 Bagels 2 Buns' }
}

result = restaurants.update_one(query_filter, update_operation)
# end-update-one

# start-update-many
restaurants = database["restaurants"]

query_filter = {'cuisine' : 'Pizza'}
update_operation = { '$set' : 
    { 'cuisine' : 'Pasta' }
}

result = restaurants.update_many(query_filter, update_operation)
# end-update-many

# start-update-options
restaurants = database["restaurants"]

query_filter = {'borough' : 'Manhattan'}
update_operation = { '$set' : 
    { 'borough' : 'Manhattan (north)' }
}

result = restaurants.update_many(query_filter, update_operation, upsert = True)
# end-update-options