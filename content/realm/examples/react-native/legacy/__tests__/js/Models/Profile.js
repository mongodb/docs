import Realm from 'realm';
// :snippet-start: js-profile-schema
class Profile extends Realm.Object {
  static schema = {
    name: 'Profile',
    primaryKey: '_id',
    properties: {
      _id: 'uuid',
      name: 'string',
    },
  };
}
// :snippet-end:
export default Profile;
