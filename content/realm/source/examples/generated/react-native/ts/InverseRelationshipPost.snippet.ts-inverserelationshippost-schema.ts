class Post extends Realm.Object<Post> {
  _id!: Realm.BSON.ObjectId;
  title!: string;
  user!: Realm.Results<User>;

  static schema: ObjectSchema = {
    name: 'Post',
    properties: {
      _id: 'objectId',
      title: 'string',
      user: {
        type: 'linkingObjects',
        objectType: 'User',
        property: 'posts',
      },
    },
    primaryKey: '_id',
  };
}
