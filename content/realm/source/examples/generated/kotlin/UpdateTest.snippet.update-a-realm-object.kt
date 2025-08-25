// Query and update a realm object in a single write transaction
realm.write {
    val liveFrog = query<Frog>("_id == $0", PRIMARY_KEY_VALUE).find().first()
    liveFrog.name = "Michigan J. Frog"
    liveFrog.age += 1
}
