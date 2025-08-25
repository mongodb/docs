val appID = YOUR_APP_ID // replace this with your App ID
var app: App? = null
app = App(
    AppConfiguration.Builder(appID)
        .defaultSyncClientResetStrategy(object : DiscardUnsyncedChangesStrategy {
            override fun onBeforeReset(realm: Realm) {
                Log.w("EXAMPLE", "Beginning client reset for " + realm.path)
            }

            override fun onAfterReset(before: Realm, after: Realm) {
                Log.w("EXAMPLE", "Finished client reset for " + before.path)
            }

            override fun onError(session: SyncSession, error: ClientResetRequiredError) {
                Log.e(
                    "EXAMPLE", "Couldn't handle the client reset automatically." +
                            " Falling back to manual client reset execution: "
                            + error.errorMessage
                )
                // close all instances of your realm -- this application only uses one
                globalRealm!!.close()
                try {
                    Log.w("EXAMPLE", "About to execute the client reset.")
                    // execute the client reset, moving the current realm to a backup file
                    error.executeClientReset()
                    Log.w("EXAMPLE", "Executed the client reset.")
                } catch (e: java.lang.IllegalStateException) {
                    Log.e("EXAMPLE", "Failed to execute the client reset: " + e.message)

                    // The client reset can only proceed if there are no open realms.
                    // if execution failed, ask the user to restart the app, and we'll client reset
                    // when we first open the app connection.
                    val restartDialog = AlertDialog.Builder(activity)
                        .setMessage("Sync error. Restart the application to resume sync.")
                        .setTitle("Restart to Continue")
                        .create()
                    restartDialog.show()
                }

                // open a new instance of the realm. This initializes a new file for the new realm
                // and downloads the backend state. Do this in a background thread so we can wait
                // for server changes to fully download.
                val executor = Executors.newSingleThreadExecutor()
                executor.execute {
                    val newRealm = Realm.getInstance(globalConfig)

                    // ensure that the backend state is fully downloaded before proceeding
                    try {
                        app!!.sync.getSession(globalConfig)
                            .downloadAllServerChanges(
                                10000,
                                TimeUnit.MILLISECONDS
                            )
                    } catch (e: InterruptedException) {
                        e.printStackTrace()
                    }
                    Log.w(
                        "EXAMPLE",
                        "Downloaded server changes for a fresh instance of the realm."
                    )
                    newRealm.close()
                }

                // execute the recovery logic on a background thread
                try {
                    executor.awaitTermination(20000, TimeUnit.MILLISECONDS)
                } catch (e: InterruptedException) {
                    e.printStackTrace()
                }
            }
        })
        .build()
)
