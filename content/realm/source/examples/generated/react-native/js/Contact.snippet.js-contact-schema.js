class Contact extends Realm.Object {
  static schema = {
    name: 'Contact',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      // Embed a single object
      address: 'Address',
    },
  };
}
