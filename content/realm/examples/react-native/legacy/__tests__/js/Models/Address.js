import Realm from 'realm';

// :snippet-start: js-address-schema
class Address extends Realm.Object {
  static schema = {
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
