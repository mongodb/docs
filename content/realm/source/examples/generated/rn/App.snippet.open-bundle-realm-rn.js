import React from 'react';
import {createRealmContext, Realm} from '@realm/react';
import {Dog} from './schema';

Realm.copyBundledRealmFiles();

const realmContext = createRealmContext({schema: [Dog], path: 'bundle.realm'});
const {RealmProvider} = realmContext;

export default function OpenBundledRealm() {
  return (
    <RealmProvider>
      {/* Rest of app has access to objects pre-populated
          in the bundled realm. */}
      <RestOfApp />
    </RealmProvider>
  );
}