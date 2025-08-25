import Realm, {ObjectSchema} from 'realm';
import User from './User';

// TODO: Replace `static schema` with TS-first models + realm-babel-plugin (https://www.npmjs.com/package/@realm/babel-plugin) approach once realm-babel-plugin version 0.1.2 releases with bug fixes
// :snippet-start: ts-inverserelationshippost-schema
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
// :snippet-end:

export default Post;
