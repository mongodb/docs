// Open a write transaction
realm.write {
    // Query Frog type with no filter to return all frog objects
    val frogsLeftInTheRealm = query<Frog>().find()
    // Pass the query results to delete()
    delete(frogsLeftInTheRealm)
}
