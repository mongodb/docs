import Realm, {ObjectSchema} from 'realm';

// TODO: Replace `static schema` with TS-first models + realm-babel-plugin (https://www.npmjs.com/package/@realm/babel-plugin) approach once realm-babel-plugin version 0.1.2 releases with bug fixes
// :snippet-start: ts-employee-schema
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
// :snippet-end:

export default Employee;
