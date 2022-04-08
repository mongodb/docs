# delete code goes here
doc = {
    "OrbitalPeriod": {
        "$gt": 5,
        "$lt": 85
    }
}
result = coll.delete_many(doc)
