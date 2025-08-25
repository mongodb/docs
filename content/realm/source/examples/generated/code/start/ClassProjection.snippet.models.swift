class Person: Object {
    @Persisted var firstName = ""
    @Persisted var lastName = ""
    @Persisted var address: Address?
    @Persisted var friends = List<Person>()
}

class Address: EmbeddedObject {
    @Persisted var city: String = ""
    @Persisted var country = ""
}
