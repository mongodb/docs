class Book : RealmObject {
    var name: String = ""
    @FullText // Marks the property with FTS
    var genre: String = ""
}
