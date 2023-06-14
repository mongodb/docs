val result = collection.findOneAndUpdate(
    Filters.lt(FirstName::firstName.name, "Gunter"),
    Updates.set("verified", true),
    FindOneAndUpdateOptions()
        .collation(Collation.builder().locale("de@collation=phonebook").build())
        .sort(Sorts.ascending(FirstName::firstName.name))
        .returnDocument(ReturnDocument.AFTER)
)
println(result)
