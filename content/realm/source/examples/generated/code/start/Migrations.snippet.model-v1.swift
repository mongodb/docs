// In the first version of the app, the Person model
// has separate fields for first and last names,
// and an age property.
class Person: Object {
    @Persisted var firstName = ""
    @Persisted var lastName = ""
    @Persisted var age = 0
}
