import Address from './Models/Address';
import Contact from './Models/Contact';
// :snippet-start: create-realm-context
import Profile from './Models/Profile';
import {createRealmContext} from '@realm/react';

export const SyncedRealmContext = createRealmContext({
  // Pass all of your models into the schema value.
  schema: [Profile],
});
// :snippet-end:
