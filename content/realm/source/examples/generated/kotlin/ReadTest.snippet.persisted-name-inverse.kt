@PersistedName(name = "Blog_Author")
class User : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    var posts: RealmList<Post> = realmListOf()
}
