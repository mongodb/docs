class Dog extends Realm.Object {
  static schema = {
    name: 'Dog',
    properties: {
      name: 'string',
      owners: {
        type: 'list',
        objectType: 'Person',
        optional: true,
      },
      age: 'int?',
    },
  };
}
