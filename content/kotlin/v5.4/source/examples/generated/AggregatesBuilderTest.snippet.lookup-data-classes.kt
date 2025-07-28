data class Order(
    @BsonId val id: Int,
    val customerId: Int,
    val item: String,
    val ordered: Int
)
data class Inventory(
    @BsonId val id: Int,
    val stockItem: String,
    val inStock: Int
)
