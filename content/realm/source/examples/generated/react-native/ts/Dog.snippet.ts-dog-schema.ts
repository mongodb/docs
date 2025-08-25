class Dog extends Realm.Object<Dog> {
  name!: string;
  owner?: Realm.List<Person>;
  age?: number;

  static schema: ObjectSchema = {
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
