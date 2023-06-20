val orderBySort = Sorts.orderBy(
    Sorts.descending(FoodOrder::letter.name), Sorts.ascending("_id")
)
val results = collection.find().sort(orderBySort)

results.collect {println(it) }
