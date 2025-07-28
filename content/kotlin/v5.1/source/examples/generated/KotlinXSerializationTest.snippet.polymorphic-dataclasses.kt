@Serializable
sealed interface Person {
    val name: String
}

@Serializable
data class Student(
    @Contextual
    @SerialName("_id")
    val id: ObjectId,
    override val name: String,
    val grade: Int,
) : Person

@Serializable
data class Teacher(
    @Contextual
    @SerialName("_id")
    val id: ObjectId,
    override val name: String,
    val department: String,
) : Person
