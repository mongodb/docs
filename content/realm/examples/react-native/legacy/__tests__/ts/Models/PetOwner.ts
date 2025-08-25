import Realm, {ObjectSchema} from 'realm';
import Pet from './Pet';

// TODO: Replace `static schema` with TS-first models + realm-babel-plugin (https://www.npmjs.com/package/@realm/babel-plugin) approach once realm-babel-plugin version 0.1.2 releases with bug fixes
// :snippet-start: ts-petowner-schema
class PetOwner extends Realm.Object<PetOwner> {
  name!: string;
  birthDate?: Date;
  pet?: Pet;

  static schema: ObjectSchema = {
    name: 'PetOwner',
    properties: {
      name: 'string',
      birthdate: 'date',
      pet: 'Pet?',
    },
  };
}
// :snippet-end:
export default PetOwner;
