val connectionFlow = realm.syncSession.connectionStateAsFlow()
connectionFlow.collect { ConnectionStateChange ->
    if (ConnectionStateChange.newState == ConnectionState.CONNECTED) {
        Log.i("Connected to Atlas Device Sync server")
    }
}
