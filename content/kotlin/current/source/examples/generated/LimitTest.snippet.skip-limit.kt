val results = collection.find()
    .sort(descending("length"))
    .skip(3)
    .limit(3)

results.collect { println(it) }
