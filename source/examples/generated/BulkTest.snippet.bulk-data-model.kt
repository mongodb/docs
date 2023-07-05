data class Person(
    @BsonId val id: Int,
    val name: String,
    val age: Int? = null,
    val location: String? = null
)
