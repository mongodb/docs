var conf = new FlexibleSyncConfiguration(user)
{
    ClientResetHandler = new RecoverUnsyncedChangesHandler
    {
        // The following callbacks are optional
        OnBeforeReset = (beforeReset) =>
        {
            // Executed before the client reset begins
            // Can be used to notify the user that a reset is going
            // to happen
        },
        OnAfterReset = (beforeReset, afterReset) =>
        {
            // Executed after the client reset is complete
            // Can be used to notify the user that the reset is done
        },
        ManualResetFallback = (err) =>
        {
            // Automatic reset failed; handle the reset manually here
        }
    }
};
