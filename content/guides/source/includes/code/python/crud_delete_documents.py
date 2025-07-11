# delete code goes here
doc = {
    "orbitalPeriod": {
        "$gt": 5,
        "$lt": 85
    }
}
result = coll.delete_many(doc)
