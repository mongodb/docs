data class Movie(
    val title: String,
    val year: Int,
    val genres: List<String>,
    val rated: String,
    val plot: String,
    val runtime: Int,
    val imdb: IMDB
){
    data class IMDB(
        val rating: Double
    )
}
