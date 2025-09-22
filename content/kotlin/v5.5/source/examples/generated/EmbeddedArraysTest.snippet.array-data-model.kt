data class PaintOrder(
    @BsonId val id: Int,
    val qty: List<Int>,
    val color: String
)
