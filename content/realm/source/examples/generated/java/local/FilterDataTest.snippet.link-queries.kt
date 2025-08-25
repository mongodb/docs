// Find all teachers who have students with the names "Wirt" or "Greg"
val result = realm.where(Teacher::class.java)
    .equalTo("students.name", "Wirt")
    .or()
    .equalTo("students.name", "Greg")
    .findAll()

