// Query the parent object
val filterByUserName = query<User>("name == $0", "Kermit")
val kermit = filterByUserName.find().first()

// Use dot notation to access child objects
val myFirstPost = kermit.posts[0]

// Iterate through the backlink collection property
kermit.posts.forEach { post ->
    Log.v("${kermit.name}'s Post: ${post.date} - ${post.title}")
}

// Filter posts through the parent's backlink property
// using `@links.<ObjectType>.<PropertyName>` syntax
val oldPostsByKermit = realm.query<Post>("date < $0", today)
    .query("@links.User.posts.name == $0", "Kermit")
    .find()

// Query the child object to access the parent
val post1 = query<Post>("title == $0", "Forest Life").find().first()
val post2 = query<Post>("title == $0", "Top Ponds of the Year!").find().first()
val parent = post1.user.first()
