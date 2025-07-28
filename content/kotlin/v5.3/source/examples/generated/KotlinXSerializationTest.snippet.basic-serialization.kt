@Serializable
data class PaintOrder(
    @SerialName("_id") // Use instead of @BsonId
    @Contextual val id: ObjectId?,
    val color: String,
    val qty: Int,
    @SerialName("brand")
    val manufacturer: String = "Acme" // Use instead of @BsonProperty
)
