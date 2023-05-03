data class FoodOrder(
    @BsonId val id: Int,
    val letter: String,
    val food: String
)
