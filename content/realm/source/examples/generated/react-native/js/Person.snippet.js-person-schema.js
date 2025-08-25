class Person extends Realm.Object {
  static schema = {
    name: 'Person',
    properties: {
      name: 'string',
      age: 'int?',
    },
  };
}
