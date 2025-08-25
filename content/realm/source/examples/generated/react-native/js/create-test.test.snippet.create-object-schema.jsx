class Person extends Realm.Object {
  static schema = {
    name: 'Person',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      age: 'int?',
    },
  };
}
