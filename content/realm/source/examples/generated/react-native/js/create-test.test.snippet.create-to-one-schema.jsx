class Pet extends Realm.Object {
  static schema = {
    name: 'Pet',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      age: 'int',
      animalType: 'string?',
    },
  };
}

class PetOwner extends Realm.Object {
  static schema = {
    name: 'PetOwner',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      age: 'int',
      pet: 'Pet?',
    },
  };
}
