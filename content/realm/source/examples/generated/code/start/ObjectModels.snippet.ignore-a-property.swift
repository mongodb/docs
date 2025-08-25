class Person: Object {
    // If some properties are marked as @Persisted,
    // any properties that do not have the @Persisted
    // annotation are automatically ignored.
    var tmpId = 0

    // The @Persisted properties are managed
    @Persisted var firstName = ""
    @Persisted var lastName = ""

    // Read-only properties are automatically ignored
    var name: String {
        return "\(firstName) \(lastName)"
    }

    // If you mix the pre-10.10 property declaration
    // syntax `@objc dynamic` with the 10.10+ @Persisted
    // annotation within a class, `@objc dynamic`
    // properties are ignored.
    @objc dynamic var email = ""
}
