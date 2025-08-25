// Find all books with "science fiction" as the genre
val scienceFiction =
    realm.query<Book>("genre TEXT $0", "science fiction").find()

// Find all books with "fiction" but not "science" in the genre
val fictionNotScience =
    realm.query<Book>("genre TEXT $0", "fiction -science").find()

// Find all books with "sci-" and "fi-" prefixes in the genre
val sciFi =
    realm.query<Book>("genre TEXT $0", "sci* fi*").find()
