val appID: String = YOUR_APP_ID // replace this with your App ID
val app = App(
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
                            " Falling back to manual recovery: " + error.errorMessage
                )
                handleManualReset(session.user.app, session, error)
            }
        })
        .build()
)
