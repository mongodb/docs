// Parent object must have RealmList<E> or RealmDictionary<K, V>
// property of child EmbeddedRealmObject type
class User : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    // List of child EmbeddedRealmObject type (CANNOT be nullable)
    var posts: RealmList<Post> = realmListOf()
    // Dictionary of child EmbeddedRealmObject type (value MUST be nullable)
    var postByYear: RealmDictionary<Post?> = realmDictionaryOf()
}
