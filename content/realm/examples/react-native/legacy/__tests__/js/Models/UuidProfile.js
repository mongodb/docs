import Realm from 'realm';

// :snippet-start: uuid-profile-schema
// :replace-start: {
//    "terms": {
//       "UuidProfile": "Profile"
//    }
// }
class UuidProfile extends Realm.Object {
  static schema = {
    name: 'UuidProfile',
    primaryKey: '_id',
    properties: {
      _id: 'uuid',
      name: 'string',
    },
  };
}
// :replace-end:
// :snippet-end:
export default UuidProfile;
