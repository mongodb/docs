data class ExampleDataClass(
    @BsonId val id: ObjectId = ObjectId(),
    val exampleProperty: String,
)
