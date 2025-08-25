// Query a to-one relationship (single object)
val kermit = query<ExampleRelationship_Frog>("name == $0", "Kermit").find().first()
val kermitsFriend: ExampleRelationship_Frog? = kermit.bestFriend

// Query a to-many relationship (collection)
val forest = query<ExampleRelationship_Forest>("name == $0", "Froggy Forest").find().first()
val nearbyPonds: RealmList<ExampleRelationship_Pond> = forest.nearbyPonds
