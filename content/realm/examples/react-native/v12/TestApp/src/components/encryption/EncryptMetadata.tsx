// :snippet-start: imports
import React from 'react';
import {Text, View} from 'react-native';
import {MetadataMode} from 'realm';
import {AppProvider} from '@realm/react';
// :snippet-end:
import {StyleSheet} from 'react-native';
import {useApp} from '@realm/react';
import {APP_ID} from '../../../appServicesConfig';

// :snippet-start: encrypt-metadata
// :replace-start: {
//    "terms": {
//       "export ": ""
//    }
// }
export const EncryptMetadata = ({
  encryptionKey,
}: {
  encryptionKey: ArrayBuffer;
}) => {
  const metadataConfig = {
    // :emphasize-start:
    mode: MetadataMode.Encryption,
    encryptionKey: encryptionKey,
    // :emphasize-end:
  };

  return (
    <AppProvider
      id={APP_ID}
      metadata={metadataConfig}>
      <RestOfApp />
    </AppProvider>
  );
};
// :replace-end:
// :snippet-end:

const RestOfApp = () => {
  const app = useApp();

  return (
    <View style={styles.section}>
      <Text testID="is-realm-app">
        Is an instance of `Realm.App`?: {app ? 'true' : 'false'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    flex: 1,
    marginTop: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
});
