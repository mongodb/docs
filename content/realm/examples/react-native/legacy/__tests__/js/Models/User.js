import Realm from 'realm';

// :snippet-start: js-user-schema
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
// :snippet-end:

export default User;
