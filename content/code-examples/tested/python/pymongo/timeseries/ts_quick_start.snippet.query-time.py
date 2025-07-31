timefield_results = stocks_coll.find({
    "$and": [
        { "date": { "$gte": datetime(2021, 12, 18, 15, 50, 0, 0) }},
        { "date": { "$lte": datetime(2021, 12, 18, 15, 56, 0, 0) }}
    ]
})
