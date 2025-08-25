import Realm from 'realm';

// :snippet-start: js-person-schema
class Person extends Realm.Object {
  static schema = {
    name: 'Person',
    properties: {
      name: 'string',
      age: 'int?',
    },
  };
}
// :snippet-end:
export default Person;
