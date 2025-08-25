// Build the query looking at all teachers:
RealmQuery<Teacher> query = realm.where(Teacher.class);

// Add query conditions:
query.equalTo("name", "Ms. Langtree");
query.or().equalTo("name", "Mrs. Jacobs");

// Execute the query:
RealmResults<Teacher> result1 = query.findAll();

// Or alternatively do the same all at once (the "Fluent interface"):
RealmResults<Teacher> result2 = realm.where(Teacher.class)
        .equalTo("name", "Ms. Langtree")
        .or()
        .equalTo("name", "Mrs. Jacobs")
        .findAll();

