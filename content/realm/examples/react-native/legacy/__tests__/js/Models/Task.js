import Realm from 'realm';

// :snippet-start: js-task-schema
class Task extends Realm.Object {
  static schema = {
    name: 'Task',
    properties: {
      _id: 'int',
      name: 'string',
      priority: 'int?',
      progressMinutes: 'int?',
      assignee: 'Person?',
    },
    primaryKey: '_id',
  };
}
// :snippet-end:
export default Task;
