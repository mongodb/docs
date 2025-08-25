class Task extends Realm.Object<Task> {
  _id!: number;
  name!: string;
  status?: string;
  owner_id?: string;

  static schema: ObjectSchema = {
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
