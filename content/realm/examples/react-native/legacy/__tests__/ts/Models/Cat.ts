import Realm, {ObjectSchema} from 'realm';
// TODO: Replace `static schema` with TS-first models + realm-babel-plugin (https://www.npmjs.com/package/@realm/babel-plugin) approach once realm-babel-plugin version 0.1.2 releases with bug fixes
// :snippet-start: ts-cat-schema
class Cat extends Realm.Object<Cat> {
  name!: string;
  birthDate?: Realm.Mixed;

  static schema: ObjectSchema = {
    name: 'Cat',
    properties: {
      name: 'string',
      birthDate: 'mixed',
    },
  };
}
// :snippet-end:
export default Cat;
