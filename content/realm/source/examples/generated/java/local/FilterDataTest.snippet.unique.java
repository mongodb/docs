// Find all students in year 9, and cap the result collection at 10 items
RealmResults<Student> result = realm.where(Student.class)
        .equalTo("year", 9)
        .distinct("name")
        .findAll();
