import Realm from 'realm';

// :snippet-start: js-pet-schema
class Pet extends Realm.Object {
  static schema = {
    name: 'Pet',
    properties: {
      name: 'string',
      age: 'int',
      animalType: 'string?',
    },
  };
}
// :snippet-end:
export default Pet;
