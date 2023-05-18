data class TheaterResults(
    val location: Location
) {
    data class Location(
        val address: Address
    ) {
        data class Address(
            val city: String
        )
    }
}

