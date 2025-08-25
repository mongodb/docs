import React from 'react';
import {
  Realm,
  AppProvider,
  UserProvider,
  createRealmContext,
} from '@realm/react';

class SharedDocument extends Realm.Object {
  static schema = {
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

class LocalDocument extends Realm.Object {
  static schema = {
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
