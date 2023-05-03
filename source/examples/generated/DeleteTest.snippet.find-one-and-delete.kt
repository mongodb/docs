val filter = Filters.eq("color", "purple")
val result = collection.findOneAndDelete(filter)
println("The following was deleted: $result")
