import React, {useEffect, useState} from 'react';
import {SyncedRealmContext} from '../RealmConfig';
const {useRealm} = SyncedRealmContext;
import {Text} from 'react-native';

function CheckUploadProgress() {
  const realm = useRealm();
  const [uploadProgressPercent, setUploadProgressPercent] = useState(0);

  useEffect(() => {
    const progressNotificationCallback = (transferred, transferable) => {
      // Convert decimal to percent with no decimals
      // (e.g. 0.6666... -> 67)
      const percentTransferred =
        parseFloat((transferred / transferable).toFixed(2)) * 100;

      setUploadProgressPercent(percentTransferred);
    };

    // Listen for changes to connection state
    realm.syncSession?.addProgressNotification(
      Realm.ProgressDirection.Upload,
      Realm.ProgressMode.ReportIndefinitely,
      progressNotificationCallback,
    );

    // Remove the connection listener when component unmounts
    return () =>
      realm.syncSession?.removeProgressNotification(
        progressNotificationCallback,
      );
    // Run useEffect only when component mounts
  }, []);

  return <Text>Percent Uploaded: {uploadProgressPercent} %</Text>;
}
