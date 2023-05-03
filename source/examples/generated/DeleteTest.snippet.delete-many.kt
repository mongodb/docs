val filter = Filters.eq("qty", 0)
collection.deleteMany(filter)
