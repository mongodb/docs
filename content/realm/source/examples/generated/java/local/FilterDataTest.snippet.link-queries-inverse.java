// Find all students who have teachers with the names "Ms. Langtree" or "Mrs. Jacobs"
RealmResults<Student> result = realm.where(Student.class)
        .equalTo("teacher.name", "Ms. Langtree")
        .or()
        .equalTo("teacher.name", "Mrs. Jacobs")
        .findAll();

