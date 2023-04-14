val filter = Filters.and(Filters.gt("qty", 3), Filters.lt("qty", 9))
collection.find(filter).toList().forEach { println(it) }
