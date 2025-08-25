class Todo: Object {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var name: String = ""
    @Persisted var ownerId: String
    @Persisted var status: String = ""

    convenience init(name: String, ownerId: String) {
        self.init()
        self.name = name
        self.ownerId = ownerId
    }
}
