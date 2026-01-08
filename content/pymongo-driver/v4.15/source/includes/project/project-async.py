# start-project-include
results = restaurants.find({ "name" : "Emerald Pub"}, {"name": 1, "cuisine": 1, "borough": 1})

async for restaurant in results:
    print(restaurant)
# end-project-include

# start-project-include-without-id
results = restaurants.find({ "name" : "Emerald Pub"}, {"_id": 0, "name": 1, "cuisine": 1, "borough": 1})

async for restaurant in results:
    print(restaurant)
# end-project-include-without-id

# start-project-exclude
results = restaurants.find({ "name" : "Emerald Pub"}, {"grades": 0, "address": 0} )

async for restaurant in results:
    print(restaurant)
# end-project-exclude