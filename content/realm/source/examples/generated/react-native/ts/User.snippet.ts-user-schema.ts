class User extends Realm.Object<User, '_id' | 'name'> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  birthdate?: Date;
  posts!: Realm.List<Post>;

  static schema: ObjectSchema = {
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
