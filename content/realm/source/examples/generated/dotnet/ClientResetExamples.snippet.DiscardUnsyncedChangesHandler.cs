{
    var config = new FlexibleSyncConfiguration(user);
    config.ClientResetHandler = new DiscardUnsyncedChangesHandler()
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
    };
    try
    {
        var realm = await Realm.GetInstanceAsync(config);
    }
    catch (Exception ex)
    {
        Console.WriteLine($@"Error creating or opening the
            realm file. {ex.Message}");
    }
