data class PaintOrder(
    @BsonId val id: Int,
    val qty: IntArray,
    val color: String
)
