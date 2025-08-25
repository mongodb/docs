// Open a write transaction
realm.write {
    // Query by species and limit to 3 results
    val bullfrogsToDelete: RealmResults<Frog> = query<Frog>("species == 'bullfrog' LIMIT(3)").find()
    // Pass the query results to delete()
    delete(bullfrogsToDelete)
}
