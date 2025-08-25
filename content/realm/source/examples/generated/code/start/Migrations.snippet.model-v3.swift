// In version 3, the Person model has one
// combined field for the full name and age as a String. 
// A manual migration will be required to convert from 
// version 2 to this version.
 class Person: Object {
    @Persisted var fullName = ""
    @Persisted var age = "0"
 }
