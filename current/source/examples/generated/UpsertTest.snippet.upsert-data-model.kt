data class PaintOrder(
    @BsonId val id: ObjectId = ObjectId(),
    val qty: Int,
    val color: String
)
