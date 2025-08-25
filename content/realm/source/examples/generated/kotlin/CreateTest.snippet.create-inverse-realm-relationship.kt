realm.write {
    // Instantiate a new unmanaged User object with to-many
    // relationship with multiple Realm objects
    val post1 = Post().apply {
        title = "Forest Life"
    }
    val post2 = Post().apply {
        title = "Top Ponds of the Year!"
    }

    val user = User().apply {
        name = "Kermit"
        posts = realmListOf(post1, post2)
    }
    // Copy all objects to the realm to return managed instances
    copyToRealm(user)
}
