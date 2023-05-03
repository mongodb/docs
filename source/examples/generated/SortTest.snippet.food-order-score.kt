data class FoodOrderScore(
   @BsonId val id: Int,
    val letter: String,
    val food: String,
    val score: Double
)
