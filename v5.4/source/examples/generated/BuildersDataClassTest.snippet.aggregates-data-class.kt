// Data class to store aggregation result
data class Summary ( val average: Double )

val pipeline = listOf(
    // Sorts grades from high to low
    sort(Sorts.descending(Student::gradeAverage)),
    // Selects the top 3 students
    limit(3),
    // Calculates the average of their grades and stores value in a Summary instance
    group(null, avg(Summary::average, "\$${Student::gradeAverage.name}"))
)

val result = collection.aggregate<Summary>(pipeline)
