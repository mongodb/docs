Aggregates.merge(
    MongoNamespace("aggregation", "movie_ratings"),
    MergeOptions().uniqueIdentifier(listOf("year", "title"))
            .whenMatched(MergeOptions.WhenMatched.REPLACE)
        .whenNotMatched(MergeOptions.WhenNotMatched.INSERT)
)
