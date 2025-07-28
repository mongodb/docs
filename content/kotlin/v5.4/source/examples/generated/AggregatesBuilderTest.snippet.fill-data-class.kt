data class Weather(
    @BsonId val id: ObjectId = ObjectId(),
    val hour: Int,
    val temperature: String?,
    val air_pressure: Double?
)
