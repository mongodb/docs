// Open a write transaction
realm.write {
    // Query the Frog type and filter by primary key value
    val frogToDelete: Frog = query<Frog>("_id == $0", PRIMARY_KEY_VALUE).find().first()
    // Pass the query results to delete()
    delete(frogToDelete)
}
