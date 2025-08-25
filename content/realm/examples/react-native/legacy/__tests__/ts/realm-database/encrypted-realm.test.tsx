// :snippet-start: encrypted-realm
import React from 'react';
import {createRealmContext, Realm} from '@realm/react';
import Cat from '../Models/Cat';
import {FlatList, View} from 'react-native';
// :remove-start:
import {render, waitFor} from '@testing-library/react-native';
const testId = 'test-encrypted-realm-query';
// :remove-end:
// :replace-start: {
//  "terms": {
//   " testID={testId}": ""
//   }
// }

// Retrieve key from secure location or create one...
const key = new Int8Array(64); // Populate with a secure key
// ... store key ...

const config: Realm.Configuration = {
  schema: [Cat.schema],
  // Add encryption key to realm configuration
  encryptionKey: key,
  path: Date.now().toString() + '.realm', // :remove
};

const {RealmProvider, useQuery} = createRealmContext(config);

function App() {
  return (
    <RealmProvider>
      <ListCats />
    </RealmProvider>
  );
}

// Work with realm as normal once it's been opened.
function ListCats() {
  const cats = useQuery<Cat>('Cat');
  return (
    <FlatList
      data={cats}
      renderItem={({item}) => <View testID={testId}>{item.name}</View>}
      keyExtractor={item => item.name}
    />
  );
}
// :replace-end:
// :snippet-end:

beforeEach(async () => {
  const realm = await Realm.open(config);
  realm.write(() => {
    realm.create('Cat', {name: 'Fred'});
    realm.create('Cat', {name: 'Lola'});
  });
  realm.close();
});
afterEach(() => {
  Realm.deleteFile(config);
});

test('Open encrypted realm', async () => {
  const {findAllByTestId} = render(<App />);
  await waitFor(async () => {
    const catViews = await findAllByTestId(testId);
    expect(catViews.length).toBe(2);
  });
});
