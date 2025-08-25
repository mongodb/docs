class Book extends Realm.Object {
  static schema = {
    name: 'Book',
    properties: {
      name: {type: 'string', indexed: true},
      price: 'int?',
    },
  };
}
