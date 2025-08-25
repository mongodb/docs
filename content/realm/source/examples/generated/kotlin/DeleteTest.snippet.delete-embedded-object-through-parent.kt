// Delete the parent object
realm.write {
    val businessToDelete = query<Business>("name == $0", "Big Frog Corp.").find().first()
    // Delete the parent object (deletes all embedded objects)
    delete(businessToDelete)
}
