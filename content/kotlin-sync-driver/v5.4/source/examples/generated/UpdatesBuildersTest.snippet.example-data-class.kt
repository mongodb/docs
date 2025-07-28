data class PaintOrder (
    @BsonId val id: Int,
    val color: String,
    val qty: Int?,
    val vendor: List<Vendor>?,
    val lastModified: LocalDateTime?
)

data class Vendor (
    val name: String,
)
