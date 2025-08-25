class Project: Object {
    @objc dynamic var id = 0
    @objc dynamic var name = ""

    // Return the name of the primary key property
    override static func primaryKey() -> String? {
        return "id"
    }
}
