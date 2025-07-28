data class NetworkDevice(
    @BsonId
    @BsonRepresentation(BsonType.OBJECT_ID)
    val deviceId: String,
    val name: String,
    @BsonProperty("type")
    val deviceType: String
)
