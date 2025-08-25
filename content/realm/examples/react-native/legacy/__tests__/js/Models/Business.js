import Realm from 'realm';

// :snippet-start: js-business-schema
class Business extends Realm.Object {
  static schema = {
    name: 'Business',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      // Embed an array of objects
      addresses: {type: 'list', objectType: 'Address'},
    },
  };
}
// :snippet-end:
export default Business;
