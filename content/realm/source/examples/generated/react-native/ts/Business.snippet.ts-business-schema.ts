class Business extends Realm.Object {
  _id!: string;
  name!: string;
  addresses!: Realm.List<Address>;

  static schema: ObjectSchema = {
    name: 'Business',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      // Embed an array of objects
      addresses: {type: 'list', objectType: 'Address'},
    },
  };
}
