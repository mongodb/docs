import Realm, {ObjectSchema} from 'realm';
// TODO: Replace `static schema` with TS-first models + realm-babel-plugin (https://www.npmjs.com/package/@realm/babel-plugin) approach once realm-babel-plugin version 0.1.2 releases with bug fixes
// :snippet-start: ts-post-schema
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
// :snippet-end:

export default Post;
