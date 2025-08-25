val clientResetStrategy = object : RecoverUnsyncedChangesStrategy {
    override fun onBeforeReset(realm: TypedRealm) {
        Log.i("Client reset: attempting to automatically recover unsynced changes")
    }
    // Executed before the client reset begins.
    // Can be used to notify the user that a reset will happen.

    override fun onAfterReset(before: TypedRealm, after: MutableRealm) {
        Log.i("Client reset: successfully recovered all unsynced changes")
    }
    // Executed after the client reset is complete.
    // Can be used to notify the user that the reset is done.

    override fun onManualResetFallback(
        session: SyncSession,
        exception: ClientResetRequiredException
    ) {
        Log.i("Client reset: manual reset required")
        // ... Handle the reset manually here
    }
    // Automatic reset failed.
}
