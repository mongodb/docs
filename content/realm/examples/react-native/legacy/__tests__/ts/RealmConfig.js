import Profile from './Models/Profile';
import Invoice from './Models/Invoice';
import Business from './Models/Business';
import Address from './Models/Address';
import Contact from './Models/Contact';
import Bird from './Models/Bird';
import Turtle from './Models/Turtle';

import {createRealmContext} from '@realm/react';

export const RealmContext = createRealmContext({
  // Pass all of your models into the schema value.
  schema: [Business, Address],
});

export const InMemoryRealmContext = createRealmContext({
  schema: [Address, Contact],
  inMemory: true,
});

export const SyncedRealmContext = createRealmContext({
  // Pass all of your models into the schema value.
  schema: [Invoice, Profile],
});

export const SubscriptionRealmContext = createRealmContext({
  schema: [Bird, Turtle],
});

export const Context = createRealmContext({
  // Pass all of your models into the schema value.
  schema: [Profile],
});
