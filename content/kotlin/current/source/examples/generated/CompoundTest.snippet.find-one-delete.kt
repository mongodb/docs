val sort = Sorts.descending("_id")
val filter = Filters.empty()
val options = FindOneAndDeleteOptions().sort(sort)
val result = collection.findOneAndDelete(filter, options)

println(result)
