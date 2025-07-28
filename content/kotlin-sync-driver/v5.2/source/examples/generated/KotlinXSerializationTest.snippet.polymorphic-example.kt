val collection = database.getCollection<Person>("school")

val teacherDoc = Teacher(ObjectId(), "Vivian Lee", "History")
val studentDoc = Student(ObjectId(), "Kate Parker", 10)

collection.insertOne(teacherDoc)
collection.insertOne(studentDoc)

println("Retrieving by using data classes")
collection.withDocumentClass<Teacher>()
    .find(Filters.exists("department"))
    .first().also { println(it) }

collection.withDocumentClass<Student>()
    .find(Filters.exists("grade"))
    .first().also { println(it) }

println("\nRetrieving by using Person interface")
val resultsFlow = collection.withDocumentClass<Person>().find()
resultsFlow.collect { println(it) }

println("\nRetrieving as Document type")
val resultsDocFlow = collection.withDocumentClass<Document>().find()
resultsDocFlow.collect { println(it) }
