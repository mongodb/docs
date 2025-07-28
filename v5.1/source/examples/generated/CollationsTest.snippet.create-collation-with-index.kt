val collection = database.getCollection<FirstName>("names")
val idxOptions = IndexOptions().collation(Collation.builder().locale("en_US").build())
collection.createIndex(Indexes.ascending(FirstName::firstName.name), idxOptions)
