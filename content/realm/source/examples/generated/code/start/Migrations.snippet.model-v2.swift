// In version 2, the Person model has one
// combined field for the full name and age as a Int. 
// A manual migration will be required to convert from 
// version 1 to this version.
class Person: Object {
    @Persisted var fullName = ""
    @Persisted var age = 0
}
