import Realm, {ObjectSchema} from 'realm';

// TODO: Replace `static schema` with TS-first models + realm-babel-plugin (https://www.npmjs.com/package/@realm/babel-plugin) approach once realm-babel-plugin version 0.1.2 releases with bug fixes
// :snippet-start: ts-book-schema
class Book extends Realm.Object<Book> {
  name!: string;
  price?: number;

  static schema: ObjectSchema = {
    name: 'Book',
    properties: {
      name: {type: 'string', indexed: true},
      price: 'int?',
    },
  };
}
// :snippet-end:
export default Book;
