import Realm from 'realm';

// :snippet-start: js-book-schema
class Book extends Realm.Object {
  static schema = {
    name: 'Book',
    properties: {
      name: {type: 'string', indexed: true},
      price: 'int?',
    },
  };
}
// :snippet-end:
export default Book;
