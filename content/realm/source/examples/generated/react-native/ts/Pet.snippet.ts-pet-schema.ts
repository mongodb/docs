class Pet extends Realm.Object<Pet> {
  name!: string;
  age!: number;
  animalType!: string;

  static schema: ObjectSchema = {
    name: 'Pet',
    properties: {
      name: 'string',
      age: 'int',
      animalType: 'string?',
    },
  };
}
