val findFlow = collection.find()
    .collation(Collation.builder().locale("is").build())
    .sort(Sorts.ascending(FirstName::firstName.name))
