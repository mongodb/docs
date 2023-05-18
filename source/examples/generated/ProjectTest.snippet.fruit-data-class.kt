data class Fruit(
    @BsonId val id: Int,
    val name: String,
    val qty: Int,
    val rating: Int
)
