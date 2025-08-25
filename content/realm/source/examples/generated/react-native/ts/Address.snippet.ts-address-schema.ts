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
