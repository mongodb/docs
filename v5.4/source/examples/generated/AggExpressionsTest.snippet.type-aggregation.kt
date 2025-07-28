val rating = current().getField("rating")

listOf(
    Aggregates.project(
        Projections.fields(
            Projections.computed("numericalRating", rating
                .isNumberOr(of(1)))
)))
