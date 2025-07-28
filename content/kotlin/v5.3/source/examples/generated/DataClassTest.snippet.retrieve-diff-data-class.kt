// Define a data class for returned documents
data class NewDataStorage(
    val productName: String,
    val capacity: Double,
    val releaseDate: LocalDate
)

val filter = Filters.eq(DataStorage::productName.name, "tape")
val update = Updates.currentDate("releaseDate")
val options = FindOneAndUpdateOptions().returnDocument(ReturnDocument.AFTER)

// Specify the class for returned documents as the type parameter in withDocumentClass()
val result = collection
    .withDocumentClass<NewDataStorage>()
    .findOneAndUpdate(filter, update, options)

println("Updated document: $result")
