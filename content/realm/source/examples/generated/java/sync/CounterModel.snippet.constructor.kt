init {
    val appID = "YOUR APP ID HERE" // TODO: replace this with your App ID

    // 1. connect to the MongoDB Realm app backend
    val app = App(
        AppConfiguration.Builder(appID)
            .build()
    )

    // 2. authenticate a user
    app.loginAsync(Credentials.anonymous()) {
        if(it.isSuccess) {
            Log.v("QUICKSTART", "Successfully logged in anonymously.")

            // 3. connect to a realm with Realm Sync
            val user: User? = app.currentUser()
            val partitionValue = "example partition"
            val config = SyncConfiguration.Builder(user!!, partitionValue)
                // because this application only reads/writes small amounts of data, it's OK to read/write from the UI thread
                .allowWritesOnUiThread(true)
                .allowQueriesOnUiThread(true)
                .build()

            // open the realm
            realm = Realm.getInstance(config)

            // 4. Query the realm for a Counter, creating a new Counter if one doesn't already exist
            // access all counters stored in this realm
            val counterQuery = realm!!.where<Counter>()
            val counters = counterQuery.findAll()

            // if we haven't created the one counter for this app before (as on first launch), create it now
            if (counters.size == 0) {
                realm?.executeTransaction { transactionRealm ->
                    val counter = Counter()
                    transactionRealm.insert(counter)
                }
            }

            // 5. Instantiate a LiveRealmObject using the Counter and store it in a member variable
            // the counters query is life, so we can just grab the 0th index to get a guaranteed counter
            this._counter.postValue(counters[0]!!)
        } else {
            Log.e("QUICKSTART", "Failed to log in anonymously. Error: ${it.error.message}")
        }
    }
}