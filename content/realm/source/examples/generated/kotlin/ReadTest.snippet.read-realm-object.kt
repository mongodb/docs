// Pass the object type as <T> parameter and filter by property
val findFrogs = realm.query<Frog>("age > 1")
    // Chain another query filter
    .query("owner == $0 AND name CONTAINS $1", "Jim Henson", "K")
    // Sort results by property
    .sort("age", Sort.ASCENDING)
    // Run the query
    .find()
// ... work with the results
