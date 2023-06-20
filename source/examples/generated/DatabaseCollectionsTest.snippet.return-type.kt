val collection =
    database.getCollection<Fruit>("fruits")

// Define a data class for returned documents
data class NewFruit(
    @BsonId val id: Int,
    val name: String,
    val quantity: Int,
    val seasons: List<String>
)

val filter = Filters.eq(Fruit::name.name, "strawberry")
val update = Updates.combine(
    Updates.rename(Fruit::qty.name, "quantity"),
    Updates.push(Fruit::seasons.name, "fall"),
)
val options = FindOneAndUpdateOptions()
    .returnDocument(ReturnDocument.AFTER)

// Specify the class for returned documents as the type parameter in withDocumentClass()
val result = collection
    .withDocumentClass<NewFruit>()
    .findOneAndUpdate(filter, update, options)
println(result)
