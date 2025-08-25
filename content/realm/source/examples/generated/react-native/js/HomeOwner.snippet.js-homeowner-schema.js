class HomeOwner extends Realm.Object {
  static schema = {
    name: 'HomeOwner',
    properties: {
      name: 'string',
      home: '{}',
      pets: {
        type: 'dictionary',
        objectType: 'Pet',
        optional: true,
      },
    },
  };
}
