import Realm from 'realm';

export class Bird extends Realm.Object<Bird> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  haveSeen!: boolean;

  static schema: Realm.ObjectSchema = {
    name: 'Bird',
    properties: {
      _id: 'objectId',
      name: 'string',
      haveSeen: 'bool',
    },
    primaryKey: '_id',
  };
}
