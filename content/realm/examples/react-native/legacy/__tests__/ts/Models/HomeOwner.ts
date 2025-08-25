import Realm, {ObjectSchema} from 'realm';
import Pet from './Pet';

// TODO: Replace `static schema` with TS-first models + realm-babel-plugin (https://www.npmjs.com/package/@realm/babel-plugin) approach once realm-babel-plugin version 0.1.2 releases with bug fixes
// :snippet-start: ts-homeowner-schema
interface Home extends Realm.Dictionary {
  address?: string;
  color?: string;
  price?: number;
  yearRenovated?: number;
}

class HomeOwner extends Realm.Object<HomeOwner> {
  name!: string;
  home!: Home;
  pets?: Pet[];

  static schema: ObjectSchema = {
    name: 'HomeOwner',
    properties: {
      name: 'string',
      home: 'mixed{}',
      pets: {
        type: 'dictionary',
        objectType: 'Pet',
        optional: true,
      },
    },
  };
}
// :snippet-end:
export default HomeOwner;
