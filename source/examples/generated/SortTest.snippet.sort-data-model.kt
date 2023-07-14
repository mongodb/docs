data class Order(
    @BsonId val id: Int,
    val date: String,
    val orderTotal: Double,
    val description: String,
)
