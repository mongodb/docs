// Parent object must have RealmList<E>, RealmSet<E>, or
// RealmDictionary<K,V> property of child type
class User : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    // List of child RealmObject type (CANNOT be nullable)
    var posts: RealmList<Post> = realmListOf()
    // Set of child RealmObject type (CANNOT be nullable)
    var favoritePosts: RealmSet<Post> = realmSetOf()
    // Dictionary of child RealmObject type (value MUST be nullable)
    var postByYear: RealmDictionary<Post?> = realmDictionaryOf()
}
