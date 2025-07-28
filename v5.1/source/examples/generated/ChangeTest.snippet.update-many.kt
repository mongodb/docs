val filter = Filters.empty()
val update = Updates.inc(PaintOrder::qty.name, 20)
val result = collection.updateMany(filter, update)

println("Matched document count: $result.matchedCount")
println("Modified document count: $result.modifiedCount")
