class Post extends Realm.Object {
  static schema = {
    name: 'Post',
    properties: {
      _id: 'objectId',
      title: 'string',
    },
    primaryKey: '_id',
  };
}
