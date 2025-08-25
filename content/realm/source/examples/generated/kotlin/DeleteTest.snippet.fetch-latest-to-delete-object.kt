val frozenFrog = realm.query<Frog>("name == $0", "Kermit").find().firstOrNull()

// Open a write transaction
realm.writeBlocking {
    // Get the live frog object with findLatest(), then delete it
    if (frozenFrog != null) {
        findLatest(frozenFrog)
            ?.also { delete(it) }
    }
}
