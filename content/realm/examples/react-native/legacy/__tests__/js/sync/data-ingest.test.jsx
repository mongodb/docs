import {render, fireEvent, act} from '@testing-library/react-native';
import {Button} from 'react-native';
import React, {useEffect} from 'react';
import Realm from 'realm';
import {
  AppProvider,
  UserProvider,
  createRealmContext,
  useApp,
} from '@realm/react';

const app = new Realm.App({id: 'js-flexible-oseso'});
const weatherSensorPrimaryKey = new Realm.BSON.ObjectId();
const APP_ID = 'js-flexible-oseso';
let sensors;

// :snippet-start: data-ingest-object
class WeatherSensor extends Realm.Object {
  static schema = {
    name: 'WeatherSensor',
    // sync WeatherSensor objects one way from your device
    // to your Atlas database.
    asymmetric: true,
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      deviceId: 'string',
      temperatureInFahrenheit: 'int',
      barometricPressureInHg: 'float',
      windSpeedInMph: 'float',
    },
  };
}
// :snippet-end:

function LogIn() {
  const app = useApp();

  useEffect(() => {
    app.logIn(Realm.Credentials.anonymous());
  }, []);

  return <></>;
}

// :snippet-start: open-realm
// Create a configuration object
const realmConfig = {schema: [WeatherSensor]};

// Create a realm context
const {RealmProvider, useRealm, useObject, useQuery} =
  createRealmContext(realmConfig);

// Expose a sync realm
function AppWrapperSync() {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={LogIn}>
        <RealmProvider sync={{flexible: true}}>
          <App />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}
// :snippet-end:

const App = () => {
  // Getting access to our opened realm instance
  const realm = useRealm();

  const handleAddSensor = () => {
    realm.write(() => {
      realm.create('WeatherSensor', {
        _id: weatherSensorPrimaryKey,
        deviceId: 'WX1278UIT',
        temperatureInFahrenheit: 66.7,
        barometricPressureInHg: 29.65,
        windSpeedInMph: 2,
      });
    });
  };

  return (
    <Button
      title='Add A New Sensor'
      onPress={() => handleAddSensor()}
      testID='handleAddSensorBtn' // :remove:
    />
  );
};

describe('Sync Data Unidirectionally from a Client App', () => {
  beforeAll(async () => {
    // Close and remove all realms in the default directory.
    Realm.clearTestState();

    const credentials = Realm.Credentials.anonymous();
    await app.logIn(credentials);
  });

  afterAll(async () => {
    app.currentUser?.logOut;
  });

  test('Create an Asymmetric Object', async () => {
    const {findByTestId} = render(<AppWrapperSync />);

    // get the Add Sensor button
    const handleAddSensorBtn = await findByTestId('handleAddSensorBtn');

    // press the Add Sensor button
    await act(() => {
      fireEvent.press(handleAddSensorBtn);
    });

    // Access linked MongoDB collection
    const mongodb = app.currentUser?.mongoClient('mongodb-atlas');
    sensors =
      mongodb.db('JSFlexibleSyncDB').collection <
      WeatherSensor >
      'WeatherSensor';

    // check if the new Sensor object has been created
    const newSensor = await sensors.findOne({_id: weatherSensorPrimaryKey});
    expect(newSensor._id).toEqual(weatherSensorPrimaryKey);
    expect(newSensor.deviceId).toBe('WX1278UIT');

    // clean up all documents and ensure they are deleted
    await sensors.deleteMany({
      deviceId: 'WX1278UIT',
    });

    const numberOfWeatherSensorDocuments = await sensors.count();
    expect(numberOfWeatherSensorDocuments).toBe(0);
  });
});
