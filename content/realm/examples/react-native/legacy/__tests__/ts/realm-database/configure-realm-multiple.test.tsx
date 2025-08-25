// :snippet-start: create-contexts
import React from 'react';
import {
  Realm,
  AppProvider,
  UserProvider,
  createRealmContext,
} from '@realm/react';
// :remove-start:
import {render, waitFor, fireEvent} from '@testing-library/react-native';
import {useApp} from '@realm/react';
import {Button, View, Text} from 'react-native';
import {ObjectSchema} from 'realm';

const APP_ID = 'js-flexible-oseso';
const testId = 'test-log-in';
let higherScopedUser: Realm.User | null;
let sharedDocumentRealmSchema: string;
let localDocumentRealmSchema: string;
// :remove-end:

class SharedDocument extends Realm.Object<SharedDocument> {
  _id!: Realm.BSON.ObjectId;
  owner_id!: Realm.BSON.ObjectId;
  title!: string;
  createdDate?: Date;

  static schema: ObjectSchema = {
    name: 'SharedDocument',
    properties: {
      _id: 'objectId',
      owner_id: 'objectId',
      title: 'string',
      createdDate: 'date',
    },
    primaryKey: '_id',
  };
}

class LocalDocument extends Realm.Object<LocalDocument> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  createdDate?: Date;

  static schema: ObjectSchema = {
    name: 'LocalDocument',
    properties: {
      _id: 'objectId',
      name: 'string',
      createdDate: 'date',
    },
  };
}

// Create Shared Document context object.
const SharedRealmContext = createRealmContext({
  schema: [SharedDocument],
});

// Create Local Document context object.
const LocalRealmContext = createRealmContext({
  schema: [LocalDocument],
});
// :snippet-end:

// :snippet-start: extract-providers-and-hooks
// Namespace the Shared Document context's providers and hooks.
const {
  RealmProvider: SharedDocumentRealmProvider,
  useRealm: useSharedDocumentRealm,
} = SharedRealmContext;

// Namespace the Local Document context's providers and hooks.
const {
  RealmProvider: LocalDocumentRealmProvider,
  useRealm: useLocalDocumentRealm,
} = LocalRealmContext;
// :snippet-end:

// :snippet-start: use-contexts
function TwoRealmsWrapper() {
  return (
    <View>
      <AppProvider id={APP_ID}>
        <UserProvider fallback={LogIn}>
          {/* This is a Flexible Sync realm. */}
          <SharedDocumentRealmProvider sync={{flexible: true}}>
            <AppSectionOne />
          </SharedDocumentRealmProvider>
        </UserProvider>
      </AppProvider>

      {/* This is a separate local-only realm. */}
      <LocalDocumentRealmProvider>
        <AppSectionTwo />
      </LocalDocumentRealmProvider>
    </View>
  );
}

function AppSectionOne() {
  const realm = useSharedDocumentRealm();

  // Work with shared documents...
  // :remove-start:
  sharedDocumentRealmSchema = realm.schema[0].name;

  return (
    <View>
      <Text>Shared document realm</Text>
    </View>
  );
  // :remove-end:
}

function AppSectionTwo() {
  const realm = useLocalDocumentRealm();

  // Work with local documents...
  // :remove-start:
  localDocumentRealmSchema = realm.schema[0].name;

  return (
    <View>
      <Text>Local document realm</Text>
    </View>
  );
  // :remove-end:
}
// :snippet-end:

function LogIn() {
  const app = useApp();

  async function logInUser() {
    await app.logIn(Realm.Credentials.anonymous());
    higherScopedUser = app.currentUser;
  }

  return <Button title='Log In' onPress={logInUser} testID={testId} />;
}

afterEach(async () => await Realm.App.getApp(APP_ID).currentUser?.logOut());

test('Instantiate realm providers and test Sync', async () => {
  const {findByTestId} = render(<TwoRealmsWrapper />);
  const button = await findByTestId(testId);

  fireEvent.press(button);

  await waitFor(() => {
    expect(higherScopedUser).toBeInstanceOf(Realm.User);
  });

  await waitFor(() => {
    expect(sharedDocumentRealmSchema).toBe('SharedDocument');
  });
});

test('Instantiate realm providers and test local', async () => {
  const {findByTestId} = render(<TwoRealmsWrapper />);
  const button = await findByTestId(testId);

  fireEvent.press(button);

  await waitFor(() => {
    expect(localDocumentRealmSchema).toBe('LocalDocument');
  });
});
