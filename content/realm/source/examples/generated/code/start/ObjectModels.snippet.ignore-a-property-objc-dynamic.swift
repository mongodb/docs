class Person: Object {
    @objc dynamic var tmpId = 0
    @objc dynamic var firstName = ""
    @objc dynamic var lastName = ""

    // Read-only properties are automatically ignored
    var name: String {
        return "\(firstName) \(lastName)"
    }

    // Return a list of ignored property names
    override static func ignoredProperties() -> [String] {
        return ["tmpId"]
    }
}
