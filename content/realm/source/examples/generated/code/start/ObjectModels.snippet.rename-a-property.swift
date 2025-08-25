class Person: Object {
    @Persisted var firstName = ""
    @Persisted var lastName = ""
    
    override class public func propertiesMapping() -> [String: String] {
        ["firstName": "first_name",
         "lastName": "last_name"]
    }
}
