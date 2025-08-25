class Employee extends Realm.Object {
  _id!: string;
  first_name!: string;

  static schema: ObjectSchema = {
    name: 'Employee',
    properties: {
      _id: 'string',
      first_name: {type: 'string', mapTo: 'firstName'},
    },
    primaryKey: '_id',
  };
}
