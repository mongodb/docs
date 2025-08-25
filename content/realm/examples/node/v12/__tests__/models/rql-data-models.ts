import Realm, { BSON, ObjectSchema } from "realm";

export class Item extends Realm.Object<Item> {
  _id!: BSON.ObjectId;
  name!: string;
  isComplete!: boolean;
  assignee?: string;
  priority!: number;
  progressMinutes?: number;

  static schema: ObjectSchema = {
    name: "Item",
    properties: {
      _id: "objectId",
      name: { type:"string", indexed: "full-text" },
      isComplete: { type: "bool", default: false },
      assignee: "string?",
      priority: {
        type: "int",
        default: 0,
      },
      progressMinutes: {
        type: "int",
        default: 0,
      },
      projects: {
        type: "linkingObjects",
        objectType: "Project",
        property: "items",
      },
    },
    primaryKey: "_id",
  };
}

export class Project extends Realm.Object<Project> {
  _id!: BSON.ObjectId;
  name!: string;
  items!: Realm.List<Item>
  quota?: number

  static schema: ObjectSchema = {
    name: "Project",
    properties: {
      _id: "objectId",
      name: "string",
      items: "Item[]",
      quota: "int?",
    },
    primaryKey: "_id",
  }
};
