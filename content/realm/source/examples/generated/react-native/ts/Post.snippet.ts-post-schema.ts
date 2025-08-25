class Post extends Realm.Object<Post, '_id' | 'title'> {
  _id!: Realm.BSON.ObjectId;
  title!: string;

  static schema: ObjectSchema = {
    name: 'Post',
    properties: {
      _id: 'objectId',
      title: 'string',
    },
    primaryKey: '_id',
  };
}
