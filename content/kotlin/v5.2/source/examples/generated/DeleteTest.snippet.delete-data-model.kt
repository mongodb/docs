data class PaintOrder(
    @BsonId val id: Int,
    val qty: Int,
    val color: String
)
