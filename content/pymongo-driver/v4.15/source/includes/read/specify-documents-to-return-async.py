# start-limit-method
results = restaurants.find({ "cuisine" : "Italian"}).limit(5)

async for restaurant in results:
    print(restaurant["name"])
# end-limit-method

# start-limit-option
results = restaurants.find({ "cuisine" : "Italian"}, limit=5)

async for restaurant in results:
    print(restaurant["name"])
# end-limit-option

# start-sort-method
results = restaurants.find({ "cuisine" : "Italian"}).sort("name", pymongo.ASCENDING)

async for restaurant in results:
    print(restaurant["name"])
# end-sort-method

# start-sort-option
results = restaurants.find({ "cuisine" : "Italian"}, sort={"name": pymongo.ASCENDING} )

async for restaurant in results:
    print(restaurant["name"])
# end-sort-option

# start-skip
results = restaurants.find({ "borough" : "Manhattan"}).skip(10)

async for restaurant in results:
    print(restaurant["name"])
# end-skip

# start-skip-option
results = restaurants.find({ "borough" : "Manhattan"}, skip=10)

async for restaurant in results:
    print(restaurant["name"])
# end-skip-option

# start-limit-sort-skip
results = restaurants.find({ "cuisine" : "Italian"}) \
                     .sort("name", pymongo.ASCENDING) \
                     .limit(5) \
                     .skip(10)

async for restaurant in results:
    print(restaurant["name"])
# end-limit-sort-skip

# start-limit-sort-skip-option
results = restaurants.find({ "cuisine" : "Italian"}, limit=5, sort={"name": pymongo.ASCENDING}, skip=10)

async for restaurant in results:
    print(restaurant["name"])
# end-limit-sort-skip-option