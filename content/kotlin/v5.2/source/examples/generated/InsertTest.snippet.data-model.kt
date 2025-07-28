data class PaintOrder(
    @BsonId val id: ObjectId? = null,
    val qty: Int,
    val color: String
)
