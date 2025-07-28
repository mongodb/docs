val collection =
    database.getCollection<ExampleDataClass>("movies")
collection.drop()
