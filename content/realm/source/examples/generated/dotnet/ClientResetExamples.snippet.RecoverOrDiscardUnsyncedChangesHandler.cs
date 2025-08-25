var conf = new FlexibleSyncConfiguration(user)
{
    ClientResetHandler = new RecoverOrDiscardUnsyncedChangesHandler
    {
        // The following callbacks are optional

        OnBeforeReset = (beforeReset) =>
        {
            // Executed before the client reset begins
            // Can be used to notify the user that a reset is going
            // to happen
        },
        OnAfterRecovery = (beforeReset, afterReset) =>
        {
            // Executed after the client reset is complete
            // Can be used to notify the user that the reset is done
        },
        OnAfterDiscard = (beforeReset, afterReset) =>
        {
            // Executed if the automatic recovery has failed
            // but the DiscardUnsyncedChanges fallback has completed
            // successfully
        },
        ManualResetFallback = (err) =>
        {
            // Automatic reset failed; handle the reset manually here
        }
    }
};
