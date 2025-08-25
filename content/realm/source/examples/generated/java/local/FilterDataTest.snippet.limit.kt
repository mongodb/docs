// Find all students in year 8, and limit the results collection to 10 items
val result: RealmResults<Student> = realm.where(Student::class.java)
    .equalTo("year", 8L)
    .limit(10)
    .findAll()
