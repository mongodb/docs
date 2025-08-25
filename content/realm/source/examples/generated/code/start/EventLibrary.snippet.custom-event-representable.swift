// To customize event serialization, your object must
// conform to the `CustomEventRepresentable` protocol.
class Person: Object, CustomEventRepresentable {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var name: String
    @Persisted var employeeId: Int
    @Persisted var userId: String?

    convenience init(name: String, employeeId: Int) {
        self.init()
        self.name = name
        self.employeeId = employeeId
    }

    // To conform to `CustomEventRepresentable`, your object
    // must implement a `customEventRepresentation` func that
    // defines your customized event serialization
    func customEventRepresentation() -> String {
        if employeeId == 0 {
            return "invalid json"
        }
        return "{\"int\": \(employeeId)}"
    }
}
