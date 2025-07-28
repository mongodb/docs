data class FoodOrder(
    @BsonId val id: Int,
    val food: String,
    val color: String
)
