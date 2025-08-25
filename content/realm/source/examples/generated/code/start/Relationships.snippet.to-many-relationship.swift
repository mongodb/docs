class Person: Object {
    @Persisted var name: String = ""
    @Persisted var birthdate: Date = Date(timeIntervalSince1970: 1)

    // A person can have many dogs
    @Persisted var dogs: List<Dog>
}

class Dog: Object {
    @Persisted var name: String = ""
    @Persisted var age: Int = 0
    @Persisted var breed: String?
    // No backlink to person -- one-directional relationship
}
