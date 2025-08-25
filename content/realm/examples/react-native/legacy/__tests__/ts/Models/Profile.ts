import Realm, {ObjectSchema} from 'realm';
// TODO: Replace `static schema` with TS-first models + realm-babel-plugin (https://www.npmjs.com/package/@realm/babel-plugin) approach once realm-babel-plugin version 0.1.2 releases with bug fixes
// :snippet-start: ts-profile-schema
class Profile extends Realm.Object<Profile> {
  _id!: Realm.BSON.ObjectId;
  name!: string;

  static schema: ObjectSchema = {
    name: 'Profile',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
    },
  };
}
// :snippet-end:
export default Profile;
