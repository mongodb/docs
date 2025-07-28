data class YearlyTemperature(
    @BsonId val id: ObjectId,
    val year: Int,
    val type: String,
    val temperatures: List<MonthlyTemperature>
) {
    data class MonthlyTemperature(
        val month: String,
        val avg: Double
    )
}
