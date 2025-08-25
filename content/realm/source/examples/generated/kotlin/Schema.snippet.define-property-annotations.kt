class Frog : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId() // Primary key property
    @Index
    var name: String = "" // Indexed property
    @Ignore
    var age: Int = 0 // Ignored property
    @PersistedName("latin_name")
    var species: String? = null // Remapped property
    @FullText
    var physicalDescription: String? = null // Full-text search indexed property
}
