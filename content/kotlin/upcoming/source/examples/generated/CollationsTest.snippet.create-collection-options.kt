database.createCollection(
    "names",
    CreateCollectionOptions().collation(
        Collation.builder().locale("en_US").build()
    )
)
