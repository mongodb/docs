data class User(
    @BsonId
    val id: BsonObjectId = BsonObjectId(),
    val gender: String,
    val age: Int,
    val email: String,
)
