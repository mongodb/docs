import Realm, { BSON } from "realm";

// :snippet-start: declare-counter-schema
export class SiteVisitTracker extends Realm.Object {
  static schema = {
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
export class QuickstartTask extends Realm.Object {
  static schema = {
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
