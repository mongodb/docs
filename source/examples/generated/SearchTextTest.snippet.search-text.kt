val filter = Filters.and(Filters.gt("_id", 1))
collection.find(filter).toList().forEach { println(it) }
