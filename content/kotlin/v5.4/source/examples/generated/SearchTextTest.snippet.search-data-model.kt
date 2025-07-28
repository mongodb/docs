data class Movies(
    @BsonId val id: Int,
    val title: String,
    val tags: List<String>
)
