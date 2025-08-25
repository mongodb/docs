// In a new version, you remove a property
// on the Person model.
class Person: Object {
    @Persisted var firstName = ""
    @Persisted var lastName = ""
    // Remove the "age" property.
    // @Persisted var age = 0
    // Removed properties can be migrated
    // automatically, but must update the schema version.

}
