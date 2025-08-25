class Pet extends Realm.Object {
  static schema = {
    name: 'Pet',
    properties: {
      name: 'string',
      age: 'int',
      animalType: 'string?',
    },
  };
}
