    collection.find().sort(descending("length")).limit(3)
    collection.find().limit(3).sort(descending("length"))
