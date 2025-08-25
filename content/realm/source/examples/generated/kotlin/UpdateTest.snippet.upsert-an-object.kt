realm.write {
    val existingFrog = query<Frog>("_id == $0", PRIMARY_KEY_VALUE).find().first()
    assertEquals(existingFrog.name, "Kermit")

    // Use copyToRealm() to insert the object with the primary key
    // ** UpdatePolicy determines whether to update or throw an error if object already exists**
    copyToRealm(Frog().apply {
        _id = PRIMARY_KEY_VALUE
        name = "Wirt"
        age = 4
        species = "Greyfrog"
        owner = "L'oric"
    }, UpdatePolicy.ALL)

    val upsertFrog = query<Frog>("_id == $0", PRIMARY_KEY_VALUE).find().first()
    assertEquals(upsertFrog.name, "Wirt")
}
