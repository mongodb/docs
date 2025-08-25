class Person extends Realm.Object<Person> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  age?: number;

  static schema: ObjectSchema = {
    name: 'Person',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      age: 'int?',
    },
  };
}
