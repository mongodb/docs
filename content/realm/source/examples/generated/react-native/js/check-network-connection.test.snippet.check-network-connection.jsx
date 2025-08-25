import React, {useState, useEffect} from 'react';
import {SyncedRealmContext} from '../RealmConfig';
const {useRealm} = SyncedRealmContext;
import {Text} from 'react-native';

function CheckNetworkConnection() {
  const realm = useRealm();
  const [isConnected, setIsConnected] = useState(
    realm.syncSession?.isConnected(),
  );

  useEffect(() => {
    const connectionNotificationCallback = (newState, oldState) => {
      console.log('Current connection state: ' + newState);
      console.log('Previous connection state: ' + oldState);
      setIsConnected(realm.syncSession?.isConnected());
    };

    // Listen for changes to connection state
    realm.syncSession?.addConnectionNotification(
      connectionNotificationCallback,
    );

    // Remove the connection listener when component unmounts
    return () =>
      realm.syncSession?.removeConnectionNotification(
        connectionNotificationCallback,
      );
    // Run useEffect only when component mounts
  }, []);

  return (
    <Text>
      {isConnected ? 'Connected to Network' : 'Disconnected from Network'}
    </Text>
  );
}
