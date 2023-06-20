Aggregates.project(
    Projections.fields(
        Projections.include(Movie::title.name, Movie::plot.name),
        Projections.excludeId())
)
