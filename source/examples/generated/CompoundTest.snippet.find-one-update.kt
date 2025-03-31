
val filter = Filters.eq(FoodOrder::color.name, "green")
val update = Updates.set(FoodOrder::food.name, "pizza")
val options = FindOneAndUpdateOptions()
    .upsert(true)
/* The result variable contains your document in the
    state before your update operation is performed
    or null if the document was inserted due to upsert
    being true */
val result = collection.findOneAndUpdate(filter, update, options)

println(result)
