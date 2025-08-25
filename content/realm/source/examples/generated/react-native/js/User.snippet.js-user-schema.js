class User extends Realm.Object {
  static schema = {
    name: 'User',
    properties: {
      _id: 'objectId',
      name: 'string',
      birthdate: 'date?',
      posts: 'Post[]',
    },
    primaryKey: '_id',
  };
}
