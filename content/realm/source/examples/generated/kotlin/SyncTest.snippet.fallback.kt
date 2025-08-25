override fun onManualResetFallback(
    session: SyncSession,
    exception: ClientResetRequiredException
) {
    Log.i("Client reset: manual reset required")

    // You *MUST* close any open Realm instance
    closeAllRealmInstances();

    // `executeClientReset()` creates a backup
    exception.executeClientReset();

    // (Optional) Send backup for analysis
    handleBackup(recoveryFilePath);

    // ... Restore the App state by reopening the realm 
    // or restarting the app
}
