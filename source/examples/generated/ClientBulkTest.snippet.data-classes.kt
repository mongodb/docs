data class Person(
    @BsonId val id: Int,
    val name: String,
    val age: Int? = null,
)

data class Object(
    @BsonId val id: Int,
    val type: String,
    val category: String? = null,
    val manufacturer: String? = null,
)
