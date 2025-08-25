import Realm from 'realm';
// :snippet-start: js-post-schema
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
// :snippet-end:

export default Post;
