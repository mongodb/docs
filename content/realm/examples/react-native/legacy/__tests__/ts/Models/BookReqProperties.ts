import Realm, {ObjectSchema} from 'realm';

// :snippet-start: book-model-req-properties
class Book extends Realm.Object<Book, 'name' | 'store'> {
  name!: string;
  store!: string;
  price?: number;

  static schema: ObjectSchema = {
    name: 'Book',
    properties: {
      name: {type: 'string', indexed: true},
      store: 'string',
      price: 'int?',
    },
  };
}
// :snippet-end:
export default Book;
