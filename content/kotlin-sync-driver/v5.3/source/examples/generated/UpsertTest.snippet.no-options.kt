val filter = Filters.eq(PaintOrder::color.name, "orange")
val update = Updates.inc(PaintOrder::qty.name, 10)

val results = collection.updateOne(filter, update)

println(results)
