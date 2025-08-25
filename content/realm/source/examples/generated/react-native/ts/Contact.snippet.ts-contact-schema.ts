class Contact extends Realm.Object {
  _id!: string;
  name!: string;
  address!: Address;

  static schema: ObjectSchema = {
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
