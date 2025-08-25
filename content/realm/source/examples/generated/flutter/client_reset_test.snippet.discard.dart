final config = Configuration.flexibleSync(currentUser, schema,
    clientResetHandler: DiscardUnsyncedChangesHandler(
      onBeforeReset: (beforeResetRealm) {
        // Executed before the client reset begins.
        // Can be used to notify the user that a reset is going
        // to happen.
      },
      onAfterReset: (beforeResetRealm, afterResetRealm) {
        // Executed after the client reset is complete.
        // Can be used to notify the user that the reset is done.
      },
      onManualResetFallback: (clientResetError) {
        // Automatic reset failed. Handle the reset manually here.
        // Refer to the "Manual Client Reset Fallback" documentation
        // for more information on what you can include here.
      },
    ));
