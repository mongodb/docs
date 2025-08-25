import Realm from 'realm';
// :snippet-start: js-inverserelationshippost-schema
class Post extends Realm.Object {
  static schema = {
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
// :snippet-end:

export default Post;
