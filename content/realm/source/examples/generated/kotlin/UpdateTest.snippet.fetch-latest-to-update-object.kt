val frozenFrog = realm.query<Frog>().find().first()

// Open a write transaction
realm.write {
    // Get the live frog object with findLatest(), then update it
    findLatest(frozenFrog)?.let { liveFrog ->
        liveFrog.name = "Kermit"
        liveFrog.age -= 1
    }
}
