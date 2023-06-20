// Data class for items in "movies" collection
data class Movie(
    @BsonId val id: Int,
    val title: String,
    val year: Int,
    val cast: List<String>,
    val genres: List<String>,
    val type: String,
    val rated: String,
    val plot: String,
    val fullplot: String,
    val runtime: Int,
    val imdb: IMDB
){
    data class IMDB(
        val rating: Double
    )
}
