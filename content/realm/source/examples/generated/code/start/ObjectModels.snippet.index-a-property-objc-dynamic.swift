class Book: Object {
    @objc dynamic var priceCents = 0
    @objc dynamic var title = ""

    // Return a list of indexed property names
    override static func indexedProperties() -> [String] {
        return ["title"]
    }
}
