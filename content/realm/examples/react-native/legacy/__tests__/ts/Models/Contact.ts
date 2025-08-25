import Realm, {ObjectSchema} from 'realm';
import Address from './Address';

// TODO: Replace `static schema` with TS-first models + realm-babel-plugin (https://www.npmjs.com/package/@realm/babel-plugin) approach once realm-babel-plugin version 0.1.2 releases with bug fixes
// :snippet-start: ts-contact-schema
class Contact extends Realm.Object {
  _id!: string;
  name!: string;
  address!: Address;

  static schema: ObjectSchema = {
    name: 'Contact',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      // Embed a single object
      address: 'Address',
    },
  };
}
// :snippet-end:
export default Contact;
