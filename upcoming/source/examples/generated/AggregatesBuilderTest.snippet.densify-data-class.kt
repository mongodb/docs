data class Weather(
    @BsonId val id: ObjectId = ObjectId(),
    val position: Point,
    val ts: LocalDateTime
)
