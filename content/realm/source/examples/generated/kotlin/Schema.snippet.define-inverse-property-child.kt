// Backlink of RealmObject must be RealmResults<E> of parent object type
class Post : RealmObject {
    var title: String = ""
    var date: RealmInstant = RealmInstant.now()
    // Backlink to parent RealmObject type (CANNOT be null & MUST be val)
    val user: RealmResults<User> by backlinks(User::posts)
}
