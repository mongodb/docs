data class Movie(
    val type: String,
    val languages: List<String>,
    val countries: List<String>,
    val awards: Awards){
        data class Awards(val wins: Int)
    }
