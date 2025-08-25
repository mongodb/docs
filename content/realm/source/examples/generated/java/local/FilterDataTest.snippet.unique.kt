// Find all students in year 9, and cap the result collection at 10 items
val result: RealmResults<Student> = realm.where<Student>(Student::class.java)
    .equalTo("year", 9L)
    .distinct("name")
    .findAll()
