import React from 'react';
import Realm from 'realm';
import {createRealmContext} from '@realm/react';

// Define your object model
class Profile extends Realm.Object {
  static schema = {
    name: 'Profile',
    properties: {
      _id: 'objectId',
      name: 'string',
    },
    primaryKey: '_id',
  };
}

// Create a configuration object
const realmConfig = {
  schema: [Profile],
};

// Create a realm context
const {RealmProvider, useRealm, useObject, useQuery} =
  createRealmContext(realmConfig);

// Expose a realm
function AppWrapper() {
  return (
    <RealmProvider>
      <RestOfApp objectPrimaryKey={YOUR_PRIMARY_KEY} />
    </RealmProvider>
  );
}

function RestOfApp({objectPrimaryKey}) {
  const [selectedProfileId, setSelectedProfileId] = useState(objectPrimaryKey);
  const realm = useRealm();

  const changeProfileName = (profileToChange, newName) => {
    realm.write(() => {
      profileToChange.name = newName;
    });
  };

  // ... rest of component

}
