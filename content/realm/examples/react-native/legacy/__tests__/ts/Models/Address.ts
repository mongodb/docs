import Realm, {ObjectSchema} from 'realm';

// TODO: Replace `static schema` with TS-first models + realm-babel-plugin (https://www.npmjs.com/package/@realm/babel-plugin) approach once realm-babel-plugin version 0.1.2 releases with bug fixes
// :snippet-start: ts-address-schema
class Address extends Realm.Object<Address> {
  street?: string;
  city?: string;
  country?: string;
  postalCode?: string;

  static schema: ObjectSchema = {
    name: 'Address',
    embedded: true, // default: false
    properties: {
      street: 'string?',
      city: 'string?',
      country: 'string?',
      postalCode: 'string?',
    },
  };
}
// :snippet-end:
export default Address;
