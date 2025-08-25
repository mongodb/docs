// Build a RealmQuery based on the Student type
RealmQuery<Student> query = realm.where(Student.class);

// Simple query
RealmResults<Student> studentsNamedJane =
        query.rawPredicate("name = 'Jane'").findAll();

// Multiple predicates
RealmResults<Student> studentsNamedJaneOrJohn =
        query.rawPredicate("name = 'Jane' OR name = 'John'").findAll();

// Collection queries
RealmResults<Student> studentsWithTeachers =
        query.rawPredicate("teacher.@count > 0").findAll();
RealmResults<Student> studentsWithSeniorTeachers =
        query.rawPredicate("ALL teacher.numYearsTeaching > 5").findAll();

// Sub queries
RealmResults<Student> studentsWithMathTeachersNamedSteven =
        query.rawPredicate("SUBQUERY(teacher, $teacher, $teacher.subject = 'Mathematics' AND $teacher.name = 'Mr. Stevens').@count > 0").findAll();

// Sort, Distinct, Limit
RealmResults<Student> students =
        query.rawPredicate("teacher.@count > 0 SORT(year ASCENDING) DISTINCT(name) LIMIT(5)").findAll();

// Combine two raw predicates
RealmResults<Student> studentsNamedJaneOrHenry =
        query.rawPredicate("name = 'Jane'")
                .rawPredicate("name = 'Henry'").findAll();

// Combine raw predicate with type-safe predicate
RealmResults<Student> studentsNamedJaneOrHenryAgain =
        query.rawPredicate("name = 'Jane'")
                .equalTo("name", "Henry").findAll();
