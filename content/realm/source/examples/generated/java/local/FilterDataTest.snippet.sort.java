// Find all students in year 7, and sort them by name
RealmResults<Student> result = realm.where(Student.class)
        .equalTo("year", 7)
        .sort("name")
        .findAll();

// Alternatively, find all students in year 7
RealmResults<Student> unsortedResult = realm.where(Student.class)
        .equalTo("year", 7)
        .findAll();
// then sort the results set by name
RealmResults<Student> sortedResult = unsortedResult.sort("name");
