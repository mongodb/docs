# start-distinct
results = await restaurants.distinct("borough")

for restaurant in results:
    print(restaurant)
# end-distinct

# start-distinct-with-query
results = await restaurants.distinct("borough", {
    "cuisine": "Italian"
})

for restaurant in results:
    print(restaurant)
# end-distinct-with-query

# start-distinct-with-comment
results = await restaurants.distinct("name", 
    { "borough": "Bronx", 
      "cuisine": "Pizza" }, 
    comment="Bronx pizza restaurants"
)
# end-distinct-with-comment