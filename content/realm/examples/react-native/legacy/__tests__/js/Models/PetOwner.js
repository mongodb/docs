import Realm from 'realm';

// :snippet-start: js-petowner-schema
class PetOwner extends Realm.Object {
  static schema = {
    name: 'PetOwner',
    properties: {
      name: 'string',
      birthdate: 'date',
      pet: 'Pet?',
    },
  };
}
// :snippet-end:
export default PetOwner;
