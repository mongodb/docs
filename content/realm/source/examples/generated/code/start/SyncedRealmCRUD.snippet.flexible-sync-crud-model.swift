class Item: Object {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var ownerId: String
    @Persisted var itemName: String
    @Persisted var complexity: Int
}
