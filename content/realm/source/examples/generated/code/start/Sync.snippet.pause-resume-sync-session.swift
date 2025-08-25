let syncSession = syncedRealm.syncSession!
// Suspend synchronization
syncSession.suspend()

// Later, resume synchronization
syncSession.resume()
