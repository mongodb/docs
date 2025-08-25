import Realm from 'realm';

// :snippet-start: js-employee-schema
class Employee extends Realm.Object {
  static schema = {
    name: 'Employee',
    properties: {
      _id: 'string',
      first_name: {type: 'string', mapTo: 'firstName'},
    },
    primaryKey: '_id',
  };
}
// :snippet-end:

export default Employee;
