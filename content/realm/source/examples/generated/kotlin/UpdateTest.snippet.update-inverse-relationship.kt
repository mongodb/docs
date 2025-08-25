realm.write {
    // Update child objects through the parent
    val parent = query<User>().find().first()
    parent.posts[0].title = "Forest Life Vol. 2"
    parent.posts.add(Post().apply { title = "Forest Life Vol. 3" })

    // Update child objects (Realm automatically updates the backlink collection)
    val child = query<Post>("title == $0", "Top Ponds of the Year!").find().first()
    child.title = "Top Ponds of the Year! Vol. 2"
    assertEquals("Top Ponds of the Year! Vol. 2", parent.posts[1].title)
    // Update the parent object through the child
    child.user[0].name = "Kermit Sr."

    // ** You CANNOT directly modify the backlink collection **
    val readOnlyBacklink: RealmResults<User> = child.user
}
