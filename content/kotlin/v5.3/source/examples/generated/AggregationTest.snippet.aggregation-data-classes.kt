data class Restaurant(
    val name: String,
    val contact: Contact,
    val stars: Int,
    val categories: List<String>
) {
    data class Contact(
        val phone: String,
        val email: String,
        val location: List<Double>
    )
}
