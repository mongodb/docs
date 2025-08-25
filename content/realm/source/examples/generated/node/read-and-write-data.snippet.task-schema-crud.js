const TaskSchema = {
  name: "Task",
  properties: {
    _id: "int",
    name: "string",
    priority: "int?",
    progressMinutes: "int?",
  },
  primaryKey: "_id",
};
