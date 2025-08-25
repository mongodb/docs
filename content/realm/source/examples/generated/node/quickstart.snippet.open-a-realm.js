class Task extends Realm.Object {
  static schema = {
    name: "Task",
    properties: {
      _id: "int",
      name: "string",
      status: "string?",
      owner_id: "string?",
    },
    primaryKey: "_id",
  };
}

const realm = await Realm.open({
  schema: [Task],
});
