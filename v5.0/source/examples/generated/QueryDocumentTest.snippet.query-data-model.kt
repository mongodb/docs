data class PaintOrder(
    @BsonId val id: Int,
    val qty: Int,
    val color: String,
    val vendor: List<String>,
    val rating: Int? = null
)
