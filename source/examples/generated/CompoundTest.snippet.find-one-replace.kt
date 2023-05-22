data class Music(
    @BsonId val id: Int,
    val music: String,
    val color: String
)

val filter = Filters.eq(FoodOrder::color.name, "green")
val replace = Music(1, "classical", "green")
val options = FindOneAndReplaceOptions()
    .returnDocument(ReturnDocument.AFTER)
val result = collection.withDocumentClass<Music>().findOneAndReplace(filter, replace, options)
println(result)
