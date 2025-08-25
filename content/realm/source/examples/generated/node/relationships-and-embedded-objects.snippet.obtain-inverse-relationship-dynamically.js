const User = {
  name: "User",
  primaryKey: "_id",
  properties: {
    _id: "objectId",
    _partition: "string?",
    name: "string",
    tasks: "Task[]",
  },
};
const Task = {
  name: "Task",
  primaryKey: "_id",
  properties: {
    _id: "objectId",
    _partition: "string?",
    text: "string",
  },
};

// get the User who owns the task
const linkedUser = task.linkingObjects("User", "tasks")[0];
