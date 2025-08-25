// In a new version, you add a property
// on the Person model.
class Person: Object {
    @Persisted var firstName = ""
    @Persisted var lastName = ""
    // Add a new "email" property.
    @Persisted var email: String?
    // New properties can be migrated
    // automatically, but must update the schema version.
    @Persisted var age = 0

}
