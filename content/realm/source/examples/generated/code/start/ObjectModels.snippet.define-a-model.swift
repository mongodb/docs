// A dog has an _id primary key, a string name, an optional
// string breed, and a date of birth.
class Dog: Object {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var name = ""
    @Persisted var breed: String?
    @Persisted var dateOfBirth = Date()
}
