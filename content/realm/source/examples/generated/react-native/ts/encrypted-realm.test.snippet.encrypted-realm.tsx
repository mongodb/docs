import React from 'react';
import {createRealmContext, Realm} from '@realm/react';
import Cat from '../Models/Cat';
import {FlatList, View} from 'react-native';

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
      renderItem={({item}) => <View>{item.name}</View>}
      keyExtractor={item => item.name}
    />
  );
}
