class Employee extends Realm.Object {
  static schema = {
    name: 'Employee',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      birthdate: 'date',
    },
  };
}

class Company extends Realm.Object {
  static schema = {
    name: 'Company',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      employees: {
        type: 'list',
        objectType: 'Employee',
        optional: false,
      },
    },
  };
}
