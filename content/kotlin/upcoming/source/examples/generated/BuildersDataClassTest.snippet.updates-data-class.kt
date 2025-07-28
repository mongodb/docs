val filter = Student::gradeAverage gte 85.0
val update = combine(
    addToSet(Student::teachers, "Soto"),
    Student::gradeAverage.max(90.0)
)
collection.updateMany(filter, update)
