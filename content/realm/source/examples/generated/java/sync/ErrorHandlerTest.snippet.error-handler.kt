val user = app.currentUser()
val config = SyncConfiguration.Builder(user, partition)
    .errorHandler { session, error ->
        // do some error handling
    }
    .build()
