// Backlink of EmbeddedRealmObject must be parent object type
class Post : EmbeddedRealmObject {
    var title: String = ""
    var date: RealmInstant = RealmInstant.now()
    // Backlink to parent RealmObject type (CANNOT be null & MUST be val)
    val user: User by backlinks(User::posts)
}
