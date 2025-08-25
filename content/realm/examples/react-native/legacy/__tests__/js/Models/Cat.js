import Realm from 'realm';
// :snippet-start: js-cat-schema
class Cat extends Realm.Object {
  static schema = {
    name: 'Cat',
    properties: {
      name: 'string',
      birthDate: 'mixed',
    },
  };
}
// :snippet-end:
export default Cat;
