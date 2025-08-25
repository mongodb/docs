// Find all teachers who have students with the names "Wirt" or "Greg"
RealmResults<Teacher> result = realm.where(Teacher.class)
        .equalTo("students.name", "Wirt")
        .or()
        .equalTo("students.name", "Greg")
        .findAll();

