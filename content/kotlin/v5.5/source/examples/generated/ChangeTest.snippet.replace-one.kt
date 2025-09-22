val filter = Filters.eq(PaintOrder::color.name, "pink")
val update = PaintOrder(5, "orange", 25)
val result = collection.replaceOne(filter, update)

println("Matched document count: $result.matchedCount")
println("Modified document count: $result.modifiedCount")
