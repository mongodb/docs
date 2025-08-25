let syncSession = realm.syncSession!

// Work with the realm. When you need to force the sync session to reconnect...
syncSession.reconnect()
