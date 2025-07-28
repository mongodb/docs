// Data class for the movies collection
data class Movie(
    val title: String,
    val year: Int,
    val cast: List<String>,
    val genres: List<String>,
    val type: String,
    val rated: String,
    val plot: String,
    val fullplot: String,
)

// Data class for the theaters collection
data class Theater(
    val theaterId: Int,
    val location: Location
) {
    data class Location(
        val address: Address,
        val geo: Point
    ) {
        data class Address(
            val street1: String,
            val city: String,
            val state: String,
            val zipcode: String
        )
    }
}
