val clientResetStrategy = object : RecoverOrDiscardUnsyncedChangesStrategy {
    override fun onBeforeReset(realm: TypedRealm) {
        Log.i("Client reset: attempting to automatically recover unsynced changes")
    }
    // Executed before the client reset begins.
    // Can be used to notify the user that a reset will happen.

    override fun onAfterRecovery(before: TypedRealm, after: MutableRealm) {
        Log.i("Client reset: successfully recovered all unsynced changes")
    }
    // Executed if and only if the automatic recovery has succeeded.

    override fun onAfterDiscard(before: TypedRealm, after: MutableRealm) {
        Log.i("Client reset: recovery unsuccessful, attempting to manually recover any changes")
        // ... Try to manually recover any unsynced data
        manuallyRecoverUnsyncedData(before, after)
    }
    // Executed if the automatic recovery has failed,
    // but the discard unsynced changes fallback has completed successfully.

    override fun onManualResetFallback(
        session: SyncSession,
        exception: ClientResetRequiredException
    ) {
        Log.i("Client reset: manual reset required")
        // ... Handle the reset manually here
    }
    // Automatic reset failed.
}
