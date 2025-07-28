val result = collection.findOneAndDelete(
    Filters.gt(CollationExample::a.name, "100"),
    FindOneAndDeleteOptions()
        .collation(Collation.builder().locale("en").numericOrdering(true).build())
        .sort(Sorts.ascending(CollationExample::a.name))
)
println(result)
