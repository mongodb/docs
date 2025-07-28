@Serializable
data class PaintOrder(
    val color: String,
    val qty: Int,
    @Serializable(with = InstantAsBsonDateTime::class)
    val orderDate: Instant,
)
