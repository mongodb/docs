val syncErrorHandler = SyncSession.ErrorHandler { session, error ->
    Log.e("Error message" + error.message.toString())
}
runBlocking {
    val user = app.login(credentials)
    val config = SyncConfiguration.Builder(user, setOf(Toad::class))
        .initialSubscriptions { realm ->
            add(realm.query<Toad>(), "subscription name")
        }
        .errorHandler(syncErrorHandler) // Specify a sync error handler
        .build()
    // Proceed to open a realm...
}
