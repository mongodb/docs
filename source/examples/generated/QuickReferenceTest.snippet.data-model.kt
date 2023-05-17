data class Movie(
    val title: String,
    val year: Int,
    val rated: String? = "Not Rated",
    val genres: List<String>? = listOf()
)
