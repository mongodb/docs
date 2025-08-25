class Person extends Realm.Object<Person> {
  name!: string;
  age?: number;

  static schema: ObjectSchema = {
    name: 'Person',
    properties: {
      name: 'string',
      age: 'int?',
    },
  };
}

