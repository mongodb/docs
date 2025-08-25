// Build the query looking at all teachers:
val query = realm.where(Teacher::class.java)

// Add query conditions:
query.equalTo("name", "Ms. Langtree")
query.or().equalTo("name", "Mrs. Jacobs")

// Execute the query:
val result1 = query.findAll()

// Or alternatively do the same all at once (the "Fluent interface"):
val result2 = realm.where(Teacher::class.java)
    .equalTo("name", "Ms. Langtree")
    .or()
    .equalTo("name", "Mrs. Jacobs")
    .findAll()

