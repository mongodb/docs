import { APP_ID } from "../realm.config.json";
import _ from "lodash";
// :snippet-start: import-realm-web
import * as Realm from "realm-web";
const {
  BSON: { ObjectId },
} = Realm;
// :snippet-end:
const app = new Realm.App({ id: APP_ID });
const DATA_SOURCE_NAME = "mongodb-atlas";
const DATABASE_NAME = "demo_db";
const COLLECTION_NAME = "plants";
// prettier-ignore
const sampleData = [
  // :snippet-start: sample-data
  {
    _id: ObjectId("5f87976b7b800b285345a8b4"),
    name: "venus flytrap",
    sunlight: "full",
    color: "white",
    type: "perennial",
    _partition: "Store 42",
  },
  {
    _id: ObjectId("5f87976b7b800b285345a8b5"),
    name: "sweet basil",
    sunlight: "partial",
    color: "green",
    type: "annual",
    _partition: "Store 42",
  },
  {
    _id: ObjectId("5f87976b7b800b285345a8b6"),
    name: "thai basil",
    sunlight: "partial",
    color: "green",
    type: "perennial",
    _partition: "Store 42",
  },
  {
    _id: ObjectId("5f87976b7b800b285345a8b7"),
    name: "helianthus",
    sunlight: "full",
    color: "yellow",
    type: "annual",
    _partition: "Store 42",
  },
  {
    _id: ObjectId("5f87976b7b800b285345a8b8"),
    name: "petunia",
    sunlight: "full",
    color: "purple",
    type: "annual",
    _partition: "Store 47",
  },
  // :snippet-end:
];
let plants;
beforeAll(async () => {
  await app.logIn(Realm.Credentials.anonymous());
  // :snippet-start: instantiate-mongo-client
  const mongo = app.currentUser.mongoClient(DATA_SOURCE_NAME);
  const collection = mongo.db(DATABASE_NAME).collection(COLLECTION_NAME);
  // :snippet-end:
  plants = collection;
});
beforeEach(async () => {
  await plants.insertMany(sampleData);
});
afterEach(async () => {
  await plants.deleteMany({});
});

afterAll(async () => {
  await plants.deleteMany({});
  await app.deleteUser(app.currentUser);
});

describe("Set up MongoDB Client", () => {
  test("instantiate handle", async () => {
    const plant = await plants.findOne({});
    expect(plant._id instanceof ObjectId).toBe(true);
    expect(typeof plant.name).toBe("string");
  });
});

describe("CRUD operations", () => {
  describe("Create documents", () => {
    test("Insert single document", async () => {
      // :snippet-start: insert-single-document
      const result = await plants.insertOne({
        name: "lily of the valley",
        sunlight: "full",
        color: "white",
        type: "perennial",
        _partition: "Store 47",
        _id: ObjectId("5f879f83fc9013565c23360e"), // :remove:
      });
      console.log(result);
      // :snippet-end:
      // prettier-ignore
      const expectedRes = (
        // :snippet-start: insert-single-document-result
        { insertedId: ObjectId("5f879f83fc9013565c23360e") }
        // :snippet-end:
      )
      expect(result.insertedId instanceof ObjectId).toBe(true);
      expect(result).toStrictEqual(expectedRes);
    });
    test("Insert multiple documents", async () => {
      // :snippet-start: insert-multiple-documents
      const result = await plants.insertMany([
        {
          name: "rhubarb",
          sunlight: "full",
          color: "red",
          type: "perennial",
          _partition: "Store 47",
          _id: ObjectId("5f87a0defc9013565c233611"), // :remove:
        },
        {
          name: "wisteria lilac",
          sunlight: "partial",
          color: "purple",
          type: "perennial",
          _partition: "Store 42",
          _id: ObjectId("5f87a0defc9013565c233612"), // :remove:
        },
        {
          name: "daffodil",
          sunlight: "full",
          color: "yellow",
          type: "perennial",
          _partition: "Store 42",
          _id: ObjectId("5f87a0defc9013565c233613"), // :remove:
        },
      ]);
      console.log(result);
      // :snippet-end:
      // prettier-ignore
      const expectedRes = (
        // :snippet-start: insert-multiple-documents-result
        {
          insertedIds: [
            ObjectId("5f87a0defc9013565c233611"),
            ObjectId("5f87a0defc9013565c233612"),
            ObjectId("5f87a0defc9013565c233613"),
          ],
        }
        // :snippet-end:
      );
      expect(result.insertedIds.length).toBe(3);
      expect(result.insertedIds[0] instanceof ObjectId).toBe(true);
      expect(result).toStrictEqual(expectedRes);
    });
  });
  describe("Read documents", () => {
    test("Find single document", async () => {
      // :snippet-start: find-single-document
      const venusFlytrap = await plants.findOne({ name: "venus flytrap" });
      console.log("venusFlytrap", venusFlytrap);
      // :snippet-end:
      // prettier-ignore
      const expectedRes = (
        // :snippet-start: find-single-document-result
        {
          _id: ObjectId("5f87976b7b800b285345a8b4"),
          name: "venus flytrap",
          sunlight: "full",
          color: "white",
          type: "perennial",
          _partition: "Store 42",
        }
        // :snippet-end:
      );
      expect(venusFlytrap).toStrictEqual(expectedRes);
      expect(venusFlytrap._id instanceof ObjectId).toBe(true);
      expect(venusFlytrap.name).toBe("venus flytrap");
      expect(venusFlytrap.color).toBe("white");
    });

    test("Find multiple documents", async () => {
      // :snippet-start: find-multiple-documents
      const perennials = await plants.find({ type: "perennial" });
      console.log("perennials", perennials);
      // :snippet-end:
      // prettier-ignore
      const expectedRes = (
        // :snippet-start: find-multiple-documents-result
        [
          {
            _id: ObjectId("5f87976b7b800b285345a8b4"),
            name: "venus flytrap",
            sunlight: "full",
            color: "white",
            type: "perennial",
            _partition: "Store 42",
          },
          {
            _id: ObjectId("5f87976b7b800b285345a8b6"),
            name: "thai basil",
            sunlight: "partial",
            color: "green",
            type: "perennial",
            _partition: "Store 42",
          },
        ]
        // :snippet-end:
      );
      expect(perennials).toStrictEqual(expectedRes);
    });
    test("Count documents in collection", async () => {
      // :snippet-start: count-documents-in-collection
      const numPlants = await plants.count();
      console.log(`There are ${numPlants} plants in the collection`);
      // :snippet-end:
      const strOut = `There are ${numPlants} plants in the collection`;
      // prettier-ignore
      const expectedRes = (
        // :snippet-start: count-documents-in-collection-result
        "There are 5 plants in the collection"
      // :snippet-end:
      );
      expect(strOut).toBe(expectedRes);
      expect(numPlants).toBe(5);
    });
  });
  describe("Update documents", () => {
    test("Update single document", async () => {
      const petuniaBefore = await plants.findOne({ name: "petunia" });
      expect(petuniaBefore.sunlight).toBe("full");
      // :snippet-start: update-single-document
      const result = await plants.updateOne(
        { name: "petunia" },
        { $set: { sunlight: "partial" } }
      );
      console.log(result);
      // :snippet-end:
      // prettier-ignore
      const expectedRes = (
        // :snippet-start: update-single-document-result
        { matchedCount: 1, modifiedCount: 1 }
        // :snippet-end:
      );
      expect(result).toStrictEqual(expectedRes);
      const petunia = await plants.findOne({ name: "petunia" });
      expect(petunia.sunlight).toBe("partial");
    });

    test("Update multiple documents", async () => {
      // :snippet-start: update-multiple-documents
      const result = await plants.updateMany(
        { _partition: "Store 42" },
        { $set: { _partition: "Store 51" } }
      );
      console.log(result);
      // :snippet-end:
      // prettier-ignore
      const expectedRes = (
        // :snippet-start: update-multiple-documents-result
        { matchedCount: 4, modifiedCount: 4 }
        // :snippet-end:
      );
      expect(result).toStrictEqual(expectedRes);
      const store42After = await plants.find({ _partition: "Store 42" });
      expect(store42After.length).toBe(0);
      const store51After = await plants.find({ _partition: "Store 51" });
      expect(store51After.length).toBe(4);
    });
    test("Upsert documents", async () => {
      // :snippet-start: upsert-documents
      const result = await plants.updateOne(
        {
          sunlight: "full",
          type: "perennial",
          color: "green",
          _partition: "Store 47",
          _id: ObjectId("5f1f63055512f2cb67f460a3"), // :remove:
        },
        { $set: { name: "super sweet basil" } },
        { upsert: true }
      );
      console.log(result);
      // :snippet-end:
      //prettier-ignore
      const expectedRes = (
        // :snippet-start: upsert-documents-result
        {
          matchedCount: 0,
          modifiedCount: 0,
          upsertedId: ObjectId("5f1f63055512f2cb67f460a3"),
        } 
        // :snippet-end:
      );
      expect(result).toStrictEqual(expectedRes);
    });
  });
  describe("Delete documents", () => {
    test("Delete single document", async () => {
      const countBefore = await plants.count();
      // :snippet-start: delete-single-document
      const result = await plants.deleteOne({ color: "green" });
      console.log(result);
      // :snippet-end:

      // prettier-ignore
      const expectedRes = (
        // :snippet-start: delete-single-document-result
        { deletedCount: 1 }
        // :snippet-end:
      );
      const countAfter = await plants.count();
      expect(countBefore - countAfter).toBe(1);
      expect(result).toStrictEqual(expectedRes);
    });
    test("Delete multiple documents", async () => {
      const countBefore = await plants.count();
      // :snippet-start: delete-multiple-documents
      const result = await plants.deleteMany({
        _partition: "Store 42",
      });
      console.log(result);
      // :snippet-end:
      // prettier-ignore
      const expectedRes = (
        // :snippet-start: delete-multiple-documents-result
        { deletedCount: 4 }
        // :snippet-end:
      );
      const countAfter = await plants.count();
      expect(result).toStrictEqual(expectedRes);
      expect(countBefore - countAfter).toBe(4);
    });
  });
});
describe.skip("Watch for changes", () => {
  const sleep = async (time) =>
    new Promise((resolve) => setTimeout(resolve, time));
  test("Watch for changes in a collection", async () => {
    await Promise.all([
      (async () => {
        await sleep(500);
        plants.insertOne({
          _id: ObjectId(),
          name: "delphinium",
          sunlight: "full",
          color: "purple",
          type: "perennial",
          _partition: "Store 23",
        });
      })(),
      (async () => {
        let insertedDoc = false;
        // :snippet-start: watch-for-changes
        for await (const change of plants.watch()) {
          let breakAsyncIterator = false; // Later used to exit async iterator
          // :remove-start:
          expect(change.operationType).toBe("insert");
          expect(change.fullDocument.name).toBe("delphinium");
          // :remove-end:
          switch (change.operationType) {
            case "insert": {
              insertedDoc = true; // :remove:
              const { documentKey, fullDocument } = change;
              console.log(`new document: ${documentKey}`, fullDocument);
              breakAsyncIterator = true;
              break;
            }
            case "update": {
              const { documentKey, fullDocument } = change;
              console.log(`updated document: ${documentKey}`, fullDocument);
              breakAsyncIterator = true;
              break;
            }
            case "replace": {
              const { documentKey, fullDocument } = change;
              console.log(`replaced document: ${documentKey}`, fullDocument);
              breakAsyncIterator = true;
              break;
            }
            case "delete": {
              const { documentKey } = change;
              console.log(`deleted document: ${documentKey}`);
              breakAsyncIterator = true;
              break;
            }
          }
          if (breakAsyncIterator) break; // Exit async iterator
        }
        // :snippet-end:
        expect(insertedDoc).toBe(true);
      })(),
    ]);
  });
  test("Watch for changes in a collection with a filter", async () => {
    await Promise.all([
      (async () => {
        await sleep(500);
        const perennial = await plants.findOne({ type: "perennial" });
        console.log(perennial);
        await plants.updateOne(
          { _id: perennial._id },
          {
            $set: { name: "daisy" },
          }
        );
      })(),
      (async () => {
        let updatedDoc = false;
        // :snippet-start: watch-for-changes-with-filter
        for await (const change of plants.watch({
          filter: {
            operationType: "update",
            "fullDocument.type": "perennial",
          },
        })) {
          // The change event will always represent a newly inserted perennial
          const { documentKey, fullDocument } = change;
          console.log(`new document: ${documentKey}`, fullDocument);
          expect(fullDocument.name).toBe("daisy"); // :remove:
          updatedDoc = true; // :remove:
          break; // Exit async iterator
        }
        // :snippet-end:
        expect(updatedDoc).toBe(true);
      })(),
    ]);
  });
});

describe("Aggregate documents", () => {
  test("Basic aggregation", async () => {
    // :snippet-start: basic-aggregation
    const result = await plants.aggregate([
      {
        $group: {
          _id: "$type",
          total: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    console.log(result);
    // :snippet-end:
    // prettier-ignore
    const expectedRes = (
      // :snippet-start: basic-aggregation-result
      [
        { _id: "annual", total: 3 },
        { _id: "perennial", total: 2 },
      ]
      // :snippet-end:
    );
    expect(result).toStrictEqual(expectedRes);
  });
});

// NOTE: not needed at this point in time
describe.skip("Aggregation Stages", () => {
  test("Filter Documents", async () => {
    // :__NOT__code-block-start: filter-documents
    const perennials = await plants.aggregate([
      { $match: { type: { $eq: "perennial" } } },
    ]);
    console.log(perennials);
    // :__NOT__code-block-end:
    perennials.forEach((plant) => {
      expect(plant.type).toEqual("perennial");
    });
    // prettier-ignore
    const expectedRes =  (
      // :__NOT__code-block-start: filter-documents-result
      [
        { "_id": ObjectId("5f87976b7b800b285345a8b4"), "_partition": "Store 42", "color": "white", "name": "venus flytrap", "sunlight": "full", "type": "perennial" },
        { "_id": ObjectId("5f87976b7b800b285345a8b6"), "_partition": "Store 42", "color": "green", "name": "thai basil", "sunlight": "partial", "type": "perennial" },
      ]
      // :__NOT__code-block-end:
    );
    expect(arraysHaveSameElements(perennials, expectedRes)).toBe(true);
  });

  test("Group Documents", async () => {
    // :__NOT__code-block-start: group-documents
    const result = await plants.aggregate([
      {
        $group: {
          _id: "$type",
          numItems: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    console.log(result);
    // :__NOT__code-block-end:
    expect(result).toEqual(
      // :__NOT__code-block-start: group-documents-result
      [
        { _id: "annual", numItems: 3 },
        { _id: "perennial", numItems: 2 },
      ]
      // :__NOT__code-block-end:
    );
  });

  test("Project Document Fields", async () => {
    // :__NOT__code-block-start: project-document-fields
    const result = await plants.aggregate([
      {
        $project: {
          _id: 0,
          name: 1,
          storeNumber: {
            $arrayElemAt: [{ $split: ["$_partition", " "] }, 1],
          },
        },
      },
    ]);
    console.log(result);
    // :__NOT__code-block-end:
    // prettier-ignore
    const expectedRes = (
    // :__NOT__code-block-start: project-document-fields-result
    [
      { name: "venus flytrap", storeNumber: "42" },
      { name: "sweet basil", storeNumber: "42" },
      { name: "thai basil", storeNumber: "42" },
      { name: "helianthus", storeNumber: "42" },
      { name: "petunia", storeNumber: "47" },
    ]
    // :__NOT__code-block-end:
    );
    expect(arraysHaveSameElements(result, expectedRes)).toBe(true);
  });
  test("Add Fields to Documents", async () => {
    // :__NOT__code-block-start: add-fields-to-documents
    const result = await plants.aggregate([
      {
        $addFields: {
          storeNumber: {
            $arrayElemAt: [{ $split: ["$_partition", " "] }, 1],
          },
        },
      },
    ]);
    console.log(result);
    // :__NOT__code-block-end:
    // prettier-ignore
    const expectedRes = (
      // :__NOT__code-block-start: add-fields-to-documents-result
      [
        { "_id": ObjectId("5f87976b7b800b285345a8b4"), "_partition": "Store 42", "color": "white", "name": "venus flytrap", "storeNumber": "42", "sunlight": "full", "type": "perennial" },
        { "_id": ObjectId("5f87976b7b800b285345a8b6"), "_partition": "Store 42", "color": "green", "name": "thai basil", "storeNumber": "42", "sunlight": "partial", "type": "perennial" },
        { "_id": ObjectId("5f87976b7b800b285345a8b7"), "_partition": "Store 42", "color": "yellow", "name": "helianthus", "storeNumber": "42", "sunlight": "full", "type": "annual" },
        { "_id": ObjectId("5f87a0dffc9013565c233612"), "_partition": "Store 42", "color": "purple", "name": "wisteria lilac", "storeNumber": "42", "sunlight": "partial", "type": "perennial" },
        { "_id": ObjectId("5f87a0dffc9013565c233613"), "_partition": "Store 42", "color": "yellow", "name": "daffodil", "storeNumber": "42", "sunlight": "full", "type": "perennial" },
        { "_id": ObjectId("5f1f63055512f2cb67f460a3"), "_partition": "Store 47", "color": "green", "name": "sweet basil", "storeNumber": "47", "sunlight": "full", "type": "perennial" }
      ]
      // :__NOT__code-block-end:
    );

    expect(arraysHaveSameElements(result, expectedRes)).toBe(true);
  });
  test("Unwind Array Values", async () => {
    // :__NOT__code-block-start: unwind-array-values
    const result = await plants.aggregate([
      { $group: { _id: "$type", colors: { $addToSet: "$color" } } },
      { $unwind: { path: "$colors" } },
      { $sort: { _id: 1, colors: 1 } },
    ]);
    console.log(result);
    // :__NOT__code-block-end:
    // prettier-ignore
    const expectedRes = (
      // :__NOT__code-block-start: unwind-array-values-result
      [
        { "_id": "annual", "colors": "yellow" },
        { "_id": "perennial", "colors": "green" },
        { "_id": "perennial", "colors": "purple" },
        { "_id": "perennial", "colors": "white" },
        { "_id": "perennial", "colors": "yellow" },
      ]
      // :__NOT__code-block-end:
    );
    expect(arraysHaveSameElements(result, expectedRes)).toEqual(true);
  });
});

function arraysHaveSameElements(x, y) {
  return _(x).xorWith(y, _.isEqual).isEmpty();
}
// TODO: refactor docs to make aggregation stages examples testable
