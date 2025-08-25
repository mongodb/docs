final config = Configuration.flexibleSync(currentUser, schema,
    clientResetHandler: RecoverOrDiscardUnsyncedChangesHandler(
      // All the following callbacks are optional
      onBeforeReset: (beforeResetRealm) {
        // Executed before the client reset begins.
        // Can be used to notify the user that a reset is going
        // to happen.
      },
      onAfterRecovery: (beforeResetRealm, afterResetRealm) {
        // Executed if and only if the automatic recovery has succeeded.
      },
      onAfterDiscard: (beforeResetRealm, afterResetRealm) {
        // Executed if the automatic recovery has failed
        // but the discard unsynced changes fallback has completed
        // successfully.
      },
      onManualResetFallback: (clientResetError) {
        // Automatic reset failed. Handle the reset manually here.
        // Refer to the "Manual Client Reset Fallback" documentation
        // for more information on what you can include here.
      },
    ));
