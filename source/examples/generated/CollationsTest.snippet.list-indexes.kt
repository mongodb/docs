val collection = database.getCollection<FirstName>("names")
val indexInformation = collection.listIndexes().first()
println(indexInformation.toJson())
