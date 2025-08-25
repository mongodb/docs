import React from 'react';
import Realm, {ObjectSchema} from 'realm';
import {createRealmContext} from '@realm/react';

// Define your object model
class Profile extends Realm.Object<Profile> {
  _id!: Realm.BSON.ObjectId;
  name!: string;

  static schema: ObjectSchema = {
    name: 'Profile',
    properties: {
      _id: 'objectId',
      name: 'string',
    },
    primaryKey: '_id',
  };
}

// Create a configuration object
const realmConfig: Realm.Configuration = {
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

type RestOfAppProps = {
  objectPrimaryKey: Realm.BSON.ObjectId;
};

const RestOfApp = ({objectPrimaryKey}: RestOfAppProps) => {
  const [selectedProfileId, setSelectedProfileId] = useState(objectPrimaryKey);
  const realm = useRealm();

  const changeProfileName = (profileToChange: Profile, newName: string) => {
    realm.write(() => {
      profileToChange.name = newName;
    });
  };

  // ... rest of component

