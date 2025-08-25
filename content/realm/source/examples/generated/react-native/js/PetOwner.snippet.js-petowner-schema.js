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
