val filter = Filters.eq(PaintOrder::qty.name, 18)
val update = Updates.inc("${PaintOrder::qty.name}.$", -3)
val options = FindOneAndUpdateOptions()
    .returnDocument(ReturnDocument.AFTER)
val result = collection.findOneAndUpdate(filter, update, options)

print(result)
