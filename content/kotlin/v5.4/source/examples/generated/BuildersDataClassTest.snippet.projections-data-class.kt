val combinedProj = fields(
    include(Student::name, Student::gradeAverage),
    excludeId()
)

collection.find().projection(combinedProj)
