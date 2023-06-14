data class FirstName(
    @BsonId val id: Int, 
    val firstName: String, 
    val verified: Boolean = false
)
