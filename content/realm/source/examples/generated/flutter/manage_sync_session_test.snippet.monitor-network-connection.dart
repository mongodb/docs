final connectionStream = realm.syncSession.connectionStateChanges;
late StreamSubscription streamListener;
streamListener = connectionStream.listen((connectionStateChange) {
  if (connectionStateChange.current == ConnectionState.connected) {
    print("Connected to Atlas Device Sync server");
    streamListener.cancel();
  }
});
