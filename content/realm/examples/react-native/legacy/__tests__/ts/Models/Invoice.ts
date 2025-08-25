import Realm, {ObjectSchema} from 'realm';

// TODO: Replace `static schema` with TS-first models + realm-babel-plugin (https://www.npmjs.com/package/@realm/babel-plugin) approach once realm-babel-plugin version 0.1.2 releases with bug fixes
class Invoice extends Realm.Object<Invoice> {
  _id!: Realm.BSON.ObjectId;
  item!: string;
  quantity!: number;
  price!: number;

  static schema: ObjectSchema = {
    name: 'Invoice',
    // sync Invoice objects one way from your device to your Atlas database.
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      item: 'string',
      quantity: 'int',
      price: 'int',
    },
  };
}

export default Invoice;
