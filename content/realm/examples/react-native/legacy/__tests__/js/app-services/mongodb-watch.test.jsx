// :snippet-start: mongodb-watch
import React, {useEffect} from 'react';
import Realm from 'realm';
import {useUser, useApp, AppProvider, UserProvider} from '@realm/react';
// :remove-start:
import {render, waitFor} from '@testing-library/react-native';

const APP_ID = 'example-testers-kvjdy';
let higherScopedOperationType;
const higherScopedPlantId = new Realm.BSON.ObjectID('5f87976b7b800b285345a8b4');

// Note: have to create and wait for this promise because
// otherwise the test fails and exits before all the network connection notifications
// have resolved.
let promiseResolve;
const promise = new Promise(function (resolve) {
  promiseResolve = resolve;
});

function LogIn() {
  const app = useApp();

  useEffect(() => {
    app.logIn(Realm.Credentials.anonymous());
  }, []);

  return <></>;
}
// :remove-end:

function AppWrapper() {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={<LogIn />}>
        <NotificationSetter />
      </UserProvider>
    </AppProvider>
  );
}

function NotificationSetter() {
  // Get currently logged in user
  const user = useUser();

  const watchForAllChanges = async (
    plants,
  ) => {
    // Watch for changes to the plants collection
    for await (const change of plants.watch()) {
      higherScopedOperationType = change.operationType; // :remove:
      switch (change.operationType) {
        case 'insert': {
          const {documentKey, fullDocument} = change;
          // ... do something with the change information.
          break;
        }
        case 'update': {
          const {documentKey, fullDocument} = change;
          // ... do something with the change information.
          break;
        }
        case 'replace': {
          const {documentKey, fullDocument} = change;
          // ... do something with the change information.
          break;
        }
        case 'delete': {
          const {documentKey} = change;
          // ... do something with the change information.
          break;
        }
      }
    }
    promiseResolve(true); // :remove:
  };

  useEffect(() => {
    const plants = user
      .mongoClient('mongodb-atlas')
      .db('example')
      .collection('plants');

    // Set up notifications
    watchForAllChanges(plants);
  }, [user, watchForAllChanges]);
  // ... rest of component

  return <></>; // :remove:
}
// :snippet-end:

describe('MongoDB Watch', () => {
  let plants;

  beforeAll(async () => {
    const app = Realm.App.getApp(APP_ID);

    await app.logIn(Realm.Credentials.anonymous());

    plants = app
      .currentUser.mongoClient('mongodb-atlas')
      .db('example')
      .collection('plants');
  });

  afterAll(async () => {
    const app = Realm.App.getApp(APP_ID);
    await app.currentUser?.logOut();
  });

  it('should insert a plant document', async () => {
    render(<AppWrapper />);

    try {
      await plants.insertOne({
        _id: higherScopedPlantId,
        name: 'venus flytrap',
        sunlight: 'full',
        color: 'white',
        type: 'perennial',
        _partition: 'Store 42',
      });
    } catch (error) {
      console.log(error);
    }

    await waitFor(() => expect(higherScopedOperationType).toBe('insert'));
  });

  it('should update a plant document', async () => {
    render(<AppWrapper />);

    try {
      await plants.updateOne({
        _id: higherScopedPlantId,
        name: 'venus flytrap',
        sunlight: 'full',
        type: 'perennial',
        _partition: 'Store 42',
      }, {
        $set: {color: 'green',}
      });
    } catch (error) {
      console.log(error);
    }

    await waitFor(() =>
      expect(higherScopedOperationType).toBe('update')
    );
  });

  it('should replace a plant document', async () => {
    render(<AppWrapper />);

    try {
      await plants.findOneAndReplace({
        _id: higherScopedPlantId,
      }, {
        _id: higherScopedPlantId,
        name: 'venus flytrap',
        sunlight: 'full',
        color: 'white',
        type: 'perennial',
        _partition: 'Store 42',
      });
    } catch (error) {
      console.log(error);
    }

    await waitFor(() =>
      expect(higherScopedOperationType).toBe('replace')
    );
  });

  it('should delete a plant document', async () => {
    render(<AppWrapper />);

    try {
      await plants.deleteOne({_id: higherScopedPlantId});
    } catch (error) {
      console.error(error);
    }

    await waitFor(() => expect(higherScopedOperationType).toBe('delete'));
  });
});

// Note: rest of the examples on React Native 'query MongoDB' page can be found
// in the Node.js unit test suite in the file `examples/node/Examples/mongodb.js`.
