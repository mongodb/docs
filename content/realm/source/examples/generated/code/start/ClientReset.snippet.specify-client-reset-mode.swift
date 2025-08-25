// Specify the clientResetMode when you create the SyncConfiguration.
// If you do not specify, this defaults to `.recoverUnsyncedChanges` mode.
var configuration = user.flexibleSyncConfiguration(clientResetMode: .recoverUnsyncedChanges())
