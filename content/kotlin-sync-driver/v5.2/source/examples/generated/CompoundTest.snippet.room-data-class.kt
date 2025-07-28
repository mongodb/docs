data class HotelRoom(
    @BsonId val id: Int,
    val guest: String? = null,
    val room: String,
    val reserved: Boolean = false
)
