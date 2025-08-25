val credentials: Credentials = Credentials.anonymous()

app.loginAsync(credentials) {
    if (it.isSuccess) {
        Log.v("QUICKSTART", "Successfully authenticated anonymously.")
        val user: User? = app.currentUser()

        val partitionValue: String = "My Project"
        val config = SyncConfiguration.Builder(user, partitionValue)
            .build()

        uiThreadRealm = Realm.getInstance(config)

        addChangeListenerToRealm(uiThreadRealm)

        val task : FutureTask<String> = FutureTask(BackgroundQuickStart(app.currentUser()!!), "test")
        val executorService: ExecutorService = Executors.newFixedThreadPool(2)
        executorService.execute(task)

    } else {
        Log.e("QUICKSTART", "Failed to log in. Error: ${it.error}")
    }
}
