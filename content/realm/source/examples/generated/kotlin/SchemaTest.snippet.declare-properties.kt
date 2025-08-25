class Cat : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId() // Primary key

    @Index
    var name: String = "" // Indexed property

    var color: String? = null // Optional property

    var age: Int = 0 // 0 is default value

    @Ignore
    var tempId: Int = 0 // Ignored property

    @PersistedName("latin_name") // Remapped property
    var species: String? = null
}
