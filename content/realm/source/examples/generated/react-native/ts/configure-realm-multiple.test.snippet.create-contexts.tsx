import React from 'react';
import {
  Realm,
  AppProvider,
  UserProvider,
  createRealmContext,
} from '@realm/react';

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
