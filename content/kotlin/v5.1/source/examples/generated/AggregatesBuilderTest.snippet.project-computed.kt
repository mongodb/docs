Aggregates.project(
    Projections.fields(
        Projections.computed("rating", "\$${Movie::rated.name}"),
        Projections.excludeId()
    )
)
