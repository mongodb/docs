val resultsFlow = collection.find()
    .collation(Collation.builder().locale("en_US").build())
    .sort(Sorts.ascending(FirstName::firstName.name));
