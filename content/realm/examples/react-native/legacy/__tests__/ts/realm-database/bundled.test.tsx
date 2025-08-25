// TODO: Include this test/snippet when better docs on bundled realms for RN
// :not-snippet-start: use-bundled-realm
import React from 'react';
import {Realm, createRealmContext} from '@realm/react';
import {FlatList, View} from 'react-native';
import Cat from '../Models/Cat';
// :remove-start:
import {render, waitFor} from '@testing-library/react-native';
let higherScopeCatsLen: number;
// :remove-end:

const {RealmProvider, useQuery} = createRealmContext({
  schema: [Cat.schema],
  path: 'bundle.realm',
});

export default function App() {
  return (
    <RealmProvider>
      <RestOfApp />
    </RealmProvider>
  );
}

// Can access objects from the bundled realm
function RestOfApp() {
  const cats = useQuery<Cat>('Cat');
  higherScopeCatsLen = cats.length; // :remove:

  return (
    <FlatList
      data={cats}
      renderItem={({item}) => <View>{item.name}</View>}
      keyExtractor={item => item.name}
    />
  );
}
// :not-snippet-end:
test('Test Bundled realm works', async () => {
  render(<App />);
  await waitFor(() => {
    expect(higherScopeCatsLen).toBeGreaterThan(0);
  });
});
