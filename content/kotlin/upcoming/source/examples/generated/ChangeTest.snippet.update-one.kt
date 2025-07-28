val filter = Filters.eq(PaintOrder::color.name, "yellow")
val update = Updates.inc(PaintOrder::qty.name, 1)
val result = collection.updateOne(filter, update)

println("Matched document count: $result.matchedCount")
println("Modified document count: $result.modifiedCount")
