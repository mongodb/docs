// Find all students in year 9 and resolve the query into a results collection
val result: RealmResults<Student> = realm.where(Student::class.java)
    .equalTo("year", 9L)
    .findAll()

// filter the students results again by teacher name
val filteredResults =
    result.where().equalTo("teacher.name", "Ms. Langtree").findAll()
