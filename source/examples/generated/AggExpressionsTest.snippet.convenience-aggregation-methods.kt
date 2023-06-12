fun gradeAverage(students: MqlArray<MqlDocument>, fieldName: String): MqlNumber {
    val sum = students.sum{ student -> student.getInteger(fieldName) }
    val avg = sum.divide(students.size())
    return avg
}

fun evaluate(grade: MqlNumber, cutoff1: MqlNumber, cutoff2: MqlNumber): MqlString {
    val message = grade.switchOn{ on -> on
        .lte(cutoff1) { g -> of("Needs improvement") }
        .lte(cutoff2) { g -> of("Meets expectations") }
        .defaults{g -> of("Exceeds expectations")}}
    return message
}
