data class PaintOrder(
    @BsonId val id: Int,
    val color: String,
    val qty: Int
)
