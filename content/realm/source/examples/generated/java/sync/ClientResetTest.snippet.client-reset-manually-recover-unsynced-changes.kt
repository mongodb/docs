val appID: String = YOUR_APP_ID // replace this with your App ID
val app = App(AppConfiguration.Builder(appID)
    .defaultSyncClientResetStrategy { session, error ->
        Log.v("EXAMPLE", "Executing manual client reset handler")
        handleManualReset(session.user.app, session, error)
    }
    .build())
