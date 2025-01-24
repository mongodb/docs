val sort = orderBy(
    Sorts.descending(Student::gradeAverage),
    Sorts.ascending(Student::name)
)

collection.find().sort(sort)
