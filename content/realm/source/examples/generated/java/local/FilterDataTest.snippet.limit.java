// Find all students in year 8, and limit the results collection to 10 items
RealmResults<Student> result = realm.where(Student.class)
        .equalTo("year", 8)
        .limit(10)
        .findAll();
