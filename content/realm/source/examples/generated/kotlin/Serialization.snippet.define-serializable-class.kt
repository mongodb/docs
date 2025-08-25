@Serializable
class Address(
    val street: String,
    val city: String,
    val state: String,
    val country: String,
    val postalCode: String
)

@Serializable
class Person(
    val firstName: String,
    val lastName: String
)
