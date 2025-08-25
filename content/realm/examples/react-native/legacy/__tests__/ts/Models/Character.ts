import Realm, {ObjectSchema} from 'realm';
// TODO: Replace `static schema` with TS-first models + realm-babel-plugin (https://www.npmjs.com/package/@realm/babel-plugin) approach once realm-babel-plugin version 0.1.2 releases with bug fixes
// :snippet-start: ts-character-schema
class Character extends Realm.Object<Character> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  levelsCompleted!: Realm.Set<number>;
  inventory!: Realm.Set<string>;

  static schema: ObjectSchema = {
    name: 'Character',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      levelsCompleted: 'int<>',
      inventory: {
        type: 'set',
        objectType: 'string',
      },
    },
  };
}
// :snippet-end:
export default Character;
