// Find all students who have teachers with the names "Ms. Langtree" or "Mrs. Jacobs"
val result = realm.where(Student::class.java)
    .equalTo("teacher.name", "Ms. Langtree")
    .or()
    .equalTo("teacher.name", "Mrs. Jacobs")
    .findAll()

