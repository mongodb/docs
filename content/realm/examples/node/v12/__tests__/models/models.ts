import Realm, { BSON, Counter, ObjectSchema } from "realm";

export class Task extends Realm.Object<Task> {
  _id!: BSON.ObjectId;
  name!: String;
  status?: String;
  progressMinutes?: Number;
  owner?: String;
  dueDate?: Date;

  static schema: ObjectSchema = {
    name: "Task",
    properties: {
      _id: "objectId",
      name: "string",
      status: "string?",
      progressMinutes: "int?",
      owner: "string?",
      dueDate: "date?",
    },
    primaryKey: "_id",
  };
}

// :snippet-start: declare-counter-schema
export class SiteVisitTracker extends Realm.Object<SiteVisitTracker> {
  _id!: BSON.ObjectId;
  siteVisits!: Counter;
  nullableSiteVisits?: Counter | null;

  static schema: ObjectSchema = {
    name: "SiteVisitTracker",
    primaryKey: "_id",
    properties: {
      _id: { type: "objectId", default: () => new BSON.ObjectId() },
      siteVisits: { type: "int", presentation: "counter" },
      // or siteVisits: "counter"
      nullableSiteVisits: {
        type: "int",
        presentation: "counter",
        optional: true,
      },
      // or nullableSiteVisits: "counter?"
    },
  };
}
// :snippet-end:

// :snippet-start: define-an-object-model
export class QuickstartTask extends Realm.Object<Task> {
  _id!: BSON.ObjectID;
  name!: string;
  status?: string;
  owner_id?: string;

  static schema: ObjectSchema = {
    name: "Task",
    properties: {
      _id: "objectId",
      name: "string",
      status: "string?",
      owner_id: "string?",
    },
    primaryKey: "_id",
  };
}
// :snippet-end:
