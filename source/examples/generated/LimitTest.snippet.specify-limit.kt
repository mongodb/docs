val results = collection.find()
    .sort(descending("length"))
    .limit(3)
results.collect { println(it) }
