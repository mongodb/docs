// :snippet-start: use-bundled-realm
import React from 'react';
import {Realm, createRealmContext} from '@realm/react';
import {FlatList, View, Text} from 'react-native';
import Cat from './models/Cat';
// :remove-start:
// import {render, waitFor} from '@testing-library/react-native';
// let higherScopeCatsLen: number;
// :remove-end:
console.log('before load bundle');
try {
  Realm.copyBundledRealmFiles();
} catch (err) {
  console.log(err);
}
console.log('after load bundle');

const {RealmProvider, useQuery} = createRealmContext({
  schema: [Cat.schema],
  path: 'bundle.realm',
});

export default function App() {
  return (
    // <RealmProvider>
    <RestOfApp />
    // </RealmProvider>
  );
}

// Can access objects from the bundled realm
function RestOfApp() {
  return <Text>merp</Text>;
  // const cats = useQuery<Cat>('Cat');
  // higherScopeCatsLen = cats.length; // :remove:

  // return (
  //   <FlatList
  //     data={cats}
  //     renderItem={({item}) => <View>{item.name}</View>}
  //     keyExtractor={item => item.name}
  //   />
  // );
}

// :snippet-end:

// test('Test Bundled realm works', async () => {
//   render(<App />);
//   await waitFor(() => {
//     expect(higherScopeCatsLen).toBeGreaterThan(0);
//   });
// });
