data class Book(
    @BsonId val id: Int,
    val title: String,
    val author: String,
    val length: Int
)
