class Pet extends Realm.Object<Pet> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  age!: number;
  animalType!: string;

  static schema: ObjectSchema = {
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

class PetOwner extends Realm.Object<PetOwner> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  age?: number;
  pet?: Pet;

  static schema: ObjectSchema = {
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
