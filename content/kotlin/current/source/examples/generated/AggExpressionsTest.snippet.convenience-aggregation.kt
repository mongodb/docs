val students = current().getArray<MqlDocument>("students")

listOf(
    Aggregates.project(
        Projections.fields(
            Projections.computed("evaluation", students
                .passArrayTo { s -> gradeAverage(s, "finalGrade") }
                .passNumberTo { grade -> evaluate(grade, of(70), of(85)) })
)))
