class CoffeeDrink: Object {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var name: String
    @Persisted var beanRegion: String?
    @Persisted var containsDairy: Bool
    @Persisted var storeNumber: Int
}
