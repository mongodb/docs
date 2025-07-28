val filter = Filters.eq("_id", 1)
val update = Updates.mul("${PaintOrder::qty.name}.$[]", 2)
val options = FindOneAndUpdateOptions()
    .returnDocument(ReturnDocument.AFTER)
val result = collection.findOneAndUpdate(filter, update, options)

println(result)
