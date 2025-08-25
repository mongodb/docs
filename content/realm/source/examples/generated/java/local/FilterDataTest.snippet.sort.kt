// Find all students in year 7, and sort them by name
val result: RealmResults<Student> = realm.where(Student::class.java)
    .equalTo("year", 7L)
    .sort("name")
    .findAll()

// Alternatively, find all students in year 7
val unsortedResult: RealmResults<Student> = realm.where(Student::class.java)
    .equalTo("year", 7L)
    .findAll()
// then sort the results set by name
val sortedResult = unsortedResult.sort("name")
