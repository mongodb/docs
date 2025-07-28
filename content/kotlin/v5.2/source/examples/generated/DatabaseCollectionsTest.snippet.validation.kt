val collOptions: ValidationOptions = ValidationOptions().validator(
    Filters.or(
        Filters.exists("title"),
        Filters.exists("name")
    )
)
database.createCollection(
    "movies",
    CreateCollectionOptions().validationOptions(collOptions)
)
