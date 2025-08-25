import Realm, {ObjectSchema} from 'realm';

// TODO: Replace `static schema` with TS-first models + realm-babel-plugin (https://www.npmjs.com/package/@realm/babel-plugin) approach once realm-babel-plugin version 0.1.2 releases with bug fixes
// :snippet-start: ts-pet-schema
class Pet extends Realm.Object<Pet> {
  name!: string;
  age!: number;
  animalType!: string;

  static schema: ObjectSchema = {
    name: 'Pet',
    properties: {
      name: 'string',
      age: 'int',
      animalType: 'string?',
    },
  };
}
// :snippet-end:
export default Pet;
