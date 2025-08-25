// Build a RealmQuery based on the Student type
val query = realm.where(Student::class.java)

// Simple query
val studentsNamedJane = query.rawPredicate("name = 'Jane'").findAll()

// Multiple predicates
val studentsNamedJaneOrJohn =
    query.rawPredicate("name = 'Jane' OR name = 'John'").findAll()

// Collection queries
val studentsWithTeachers =
    query.rawPredicate("teacher.@count > 0").findAll()
val studentsWithSeniorTeachers =
    query.rawPredicate("ALL teacher.numYearsTeaching > 5").findAll()

// Sub queries
val studentsWithMathTeachersNamedSteven =
    query.rawPredicate("SUBQUERY(teacher, \$teacher, \$teacher.subject = 'Mathematics' AND \$teacher.name = 'Mr. Stevens').@count > 0")
        .findAll()

// Sort, Distinct, Limit
val students =
    query.rawPredicate("teacher.@count > 0 SORT(year ASCENDING) DISTINCT(name) LIMIT(5)")
        .findAll()

// Combine two raw predicates
val studentsNamedJaneOrHenry = query.rawPredicate("name = 'Jane'")
    .rawPredicate("name = 'Henry'").findAll()

// Combine raw predicate with type-safe predicate
val studentsNamedJaneOrHenryAgain =
    query.rawPredicate("name = 'Jane'")
        .equalTo("name", "Henry").findAll()
