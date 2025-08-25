// Find all students in year 9 and resolve the query into a results collection
RealmResults<Student> result = realm.where(Student.class)
        .equalTo("year", 9)
        .findAll();

// filter the students results again by teacher name
RealmResults<Student> filteredResults = result.where().equalTo("teacher.name", "Ms. Langtree").findAll();
