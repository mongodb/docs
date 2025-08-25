import React, {useState} from 'react';
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
const {RealmProvider, useObject, useQuery} = createRealmContext(realmConfig);

// Expose a realm
function AppWrapper() {
  return (
    <RealmProvider>
      <FindSortFilterComponent objectPrimaryKey={YOUR_PRIMARY_KEY} />
    </RealmProvider>
  );
}

const FindSortFilterComponent = ({objectPrimaryKey}) => {
  const [activeProfile, setActiveProfile] = useState();
  const [allProfiles, setAllProfiles] = useState();
  const currentlyActiveProfile = useObject(Profile, objectPrimaryKey);
  const profiles = useQuery(Profile);

  const sortProfiles = reversed => {
    const sorted = useQuery(
      Profile,
      profiles => {
        return profiles.sorted('name', reversed);
      },
      [reversed],
    );

    setAllProfiles(sorted);
  };

  const filterProfiles = (filter, letter) => {
    // Use [c] for case-insensitivity.
    const filtered = useQuery(
      Profile,
      profiles => {
        return profiles.filtered(`name ${filter}[c] "${letter}"`);
      },
      [filter, letter],
    );

    setAllProfiles(filtered);
  };

  // ... rest of component
};
