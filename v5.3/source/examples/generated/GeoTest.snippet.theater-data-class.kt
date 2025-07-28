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
            val street2: String? = null,
            val city: String,
            val state: String,
            val zipcode: String
        )
    }
}
