data class Person(
    @BsonId val id: Int,
    val name: String,
)

data class Object(
    @BsonId val id: Int,
    val type: String,
)
