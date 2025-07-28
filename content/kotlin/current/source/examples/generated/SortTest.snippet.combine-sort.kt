val orderBySort = Sorts.orderBy(
    Sorts.descending(Order::date.name), Sorts.ascending(Order::orderTotal.name)
)
val results = collection.find().sort(orderBySort)

results.collect {println(it) }
