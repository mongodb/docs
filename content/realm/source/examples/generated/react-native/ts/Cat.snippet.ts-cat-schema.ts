class Cat extends Realm.Object<Cat> {
  name!: string;
  birthDate?: Realm.Mixed;

  static schema: ObjectSchema = {
    name: 'Cat',
    properties: {
      name: 'string',
      birthDate: 'mixed',
    },
  };
}
