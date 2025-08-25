// :snippet-start: add-imports-to-task
import {Realm, createRealmContext} from '@realm/react';
import {ObjectSchema} from 'realm';
// :snippet-end:

// :snippet-start: create-task-class
export class Task extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  description!: string;
  isComplete!: boolean;
  createdAt!: Date;

  // the Task.generate() method creates Task objects with fields with default values
  static generate(description: string) {
    return {
      _id: new Realm.BSON.ObjectId(),
      description,
      isComplete: false,
      createdAt: new Date(),
    };
  }

  // To use a class as a Realm object type, define the object schema on the static property "schema".
  static schema: ObjectSchema = {
    name: 'Task',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      description: 'string',
      isComplete: {type: 'bool', default: false},
      createdAt: 'date',
    },
  };
}
// :snippet-end:

// :snippet-start: create-realm-context
const config = {
  schema: [Task],
  // :remove-start:
  deleteRealmIfMigrationNeeded: true,
  // :remove-end:
};
export default createRealmContext(config);
// :snippet-end:
