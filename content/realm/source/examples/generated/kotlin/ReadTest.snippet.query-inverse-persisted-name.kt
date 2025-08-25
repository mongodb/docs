// Filter by the remapped object type name
// using `@links.<RemappedObjectType>.<PropertyName>` syntax
val postsByKermit = realm.query<Post>()
    .query("@links.Blog_Author.posts.name == $0", "Kermit")
    .find()
