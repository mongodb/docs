import Realm, {BSON, ObjectSchema} from 'realm';
import Person from './Person';

class Turtle extends Realm.Object<Turtle> {
  _id!: BSON.ObjectId;
  name!: string;
  age!: number;
  owner?: Person;

  static schema: ObjectSchema = {
    name: 'Turtle',
    properties: {
      _id: 'objectId',
      name: 'string',
      owner: 'Person?',
      age: 'int',
    },
    primaryKey: '_id',
  };
}

export default Turtle;
