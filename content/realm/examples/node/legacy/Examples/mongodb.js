import Realm from "realm";
import BSON from "bson";

jest.useFakeTimers();

// const alphabetized = (fieldName, arr) =>
//   arr.sort((l, r) => (l[fieldName][0] < r[fieldName][0] ? -1 : 1));
const ObjectId = (value) => new Realm.BSON.ObjectId(value);

// prettier-ignore
const PLANTS = [
  // :snippet-start: plants-collection-documents
  { _id: ObjectId("5f87976b7b800b285345a8c4"), name: "venus flytrap", sunlight: "full", color: "white", type: "perennial", _partition: "Store 42" },
  { _id: ObjectId("5f87976b7b800b285345a8c5"), name: "sweet basil", sunlight: "partial", color: "green", type: "annual", _partition: "Store 42" },
  { _id: ObjectId("5f87976b7b800b285345a8c6"), name: "thai basil", sunlight: "partial", color: "green", type: "perennial", _partition: "Store 42" },
  { _id: ObjectId("5f87976b7b800b285345a8c7"), name: "helianthus", sunlight: "full", color: "yellow", type: "annual", _partition: "Store 42" },
  { _id: ObjectId("5f87976b7b800b285345a8c8"), name: "petunia", sunlight: "full", color: "purple", type: "annual", _partition: "Store 47" }
  // :snippet-end:
];

const app = new Realm.App({ id: "example-testers-kvjdy" });

function getPlantsCollection() {
  // :snippet-start: plants-collection-handle
  // :replace-start: {
  //   "terms": {
  //     "js-example": "example"
  //   }
  // }
  const mongodb = app.currentUser.mongoClient("mongodb-atlas");
  const plants = mongodb.db("js-example").collection("plants");
  // :replace-end:
  // :snippet-end:
  return plants;
}

beforeAll(async () => {
  await app.logIn(Realm.Credentials.anonymous());
  await getPlantsCollection().insertMany(PLANTS);
});
afterAll(async () => {
  await getPlantsCollection().deleteMany({});
  await app.currentUser?.logOut();
});

describe("Create Documents", () => {
  test("Insert a Single Document", async () => {
    const plants = getPlantsCollection();
    // :snippet-start: insert-a-single-document
    const result = await plants.insertOne({
      // :remove-start:
      _id: new BSON.ObjectId("5f879f83fc9013565c23360e"),
      // :remove-end:
      name: "lily of the valley",
      sunlight: "full",
      color: "white",
      type: "perennial",
      _partition: "Store 47",
    });
    console.log(result);
    // :snippet-end:
    expect({ insertedId: result.insertedId.toString() }).toEqual(
      // :snippet-start: insert-a-single-document-result
      {
        insertedId: "5f879f83fc9013565c23360e",
      }
      // :snippet-end:
    );
  });
  test("Insert Multiple Documents", async () => {
    const plants = getPlantsCollection();
    // :snippet-start: insert-multiple-documents
    const result = await plants.insertMany([
      {
        // :remove-start:
        _id: new BSON.ObjectId("5f87a0defc9013565c233611"),
        // :remove-end:
        name: "rhubarb",
        sunlight: "full",
        color: "red",
        type: "perennial",
        _partition: "Store 47",
      },
      {
        // :remove-start:
        _id: new BSON.ObjectId("5f87a0dffc9013565c233612"),
        // :remove-end:
        name: "wisteria lilac",
        sunlight: "partial",
        color: "purple",
        type: "perennial",
        _partition: "Store 42",
      },
      {
        // :remove-start:
        _id: new BSON.ObjectId("5f87a0dffc9013565c233613"),
        // :remove-end:
        name: "daffodil",
        sunlight: "full",
        color: "yellow",
        type: "perennial",
        _partition: "Store 42",
      },
    ]);
    console.log(result);
    // :snippet-end:
    expect({
      insertedIds: result.insertedIds.map((objectId) => objectId.toString()),
    }).toEqual(
      // :snippet-start: insert-multiple-documents-result
      {
        insertedIds: [
          "5f87a0defc9013565c233611",
          "5f87a0dffc9013565c233612",
          "5f87a0dffc9013565c233613",
        ],
      }
      // :snippet-end:
    );
  });
});

describe("Read Documents", () => {
  test("Find a Single Document", async () => {
    const plants = getPlantsCollection();
    // :snippet-start: find-a-single-document
    const venusFlytrap = await plants.findOne({ name: "venus flytrap" });
    console.log("venusFlytrap", venusFlytrap);
    // :snippet-end:

    expect(venusFlytrap).toEqual(
      // :snippet-start: find-a-single-document-result
      {
        _id: ObjectId("5f87976b7b800b285345a8c4"),
        name: "venus flytrap",
        sunlight: "full",
        color: "white",
        type: "perennial",
        _partition: "Store 42",
      }
      // :snippet-end:
    );
  });

  test("Find Multiple Documents", async () => {
    const plants = getPlantsCollection();
    // :snippet-start: find-multiple-documents
    const perennials = await plants.find({ type: "perennial" });
    console.log("perennials", perennials);
    // :snippet-end:

    // prettier-ignore
    expect(perennials).toEqual(
      // :snippet-start: find-multiple-documents-result
      [
        { _id: ObjectId("5f87976b7b800b285345a8c4"), name: 'venus flytrap', sunlight: 'full', color: 'white', type: 'perennial', _partition: 'Store 42' },
        { _id: ObjectId("5f87976b7b800b285345a8c6"), name: 'thai basil', sunlight: 'partial', color: 'green', type: 'perennial', _partition: 'Store 42' },
        { _id: ObjectId("5f879f83fc9013565c23360e"), name: 'lily of the valley', sunlight: 'full', color: 'white', type: 'perennial', _partition: 'Store 47' },
        { _id: ObjectId("5f87a0defc9013565c233611"), name: 'rhubarb', sunlight: 'full', color: 'red', type: 'perennial', _partition: 'Store 47' },
        { _id: ObjectId("5f87a0dffc9013565c233612"), name: 'wisteria lilac', sunlight: 'partial', color: 'purple', type: 'perennial', _partition: 'Store 42' },
        { _id: ObjectId("5f87a0dffc9013565c233613"), name: 'daffodil', sunlight: 'full', color: 'yellow', type: 'perennial', _partition: 'Store 42' }
      ]
      // :snippet-end:
    );
  });

  test("Count Documents in the Collection", async () => {
    const plants = getPlantsCollection();
    // :snippet-start: count-documents-in-the-collection
    const numPlants = await plants.count();
    console.log(`There are ${numPlants} plants in the collection`);
    // :snippet-end:

    expect(`There are ${numPlants} plants in the collection`).toEqual(
      // :snippet-start: count-documents-in-the-collection-result
      "There are 9 plants in the collection"
      // :snippet-end:
    );
  });
});

describe("Update Documents", () => {
  test("Update a Single Document", async () => {
    const plants = getPlantsCollection();
    // :snippet-start: update-a-single-document
    const result = await plants.updateOne(
      { name: "petunia" },
      { $set: { sunlight: "partial" } }
    );
    console.log(result);
    // :snippet-end:

    expect(result).toEqual(
      // :snippet-start: update-a-single-document-result
      { matchedCount: 1, modifiedCount: 1 }
      // :snippet-end:
    );
  });

  test("Update Multiple Documents", async () => {
    const plants = getPlantsCollection();
    // :snippet-start: update-multiple-documents
    const result = await plants.updateMany(
      { _partition: "Store 47" },
      { $set: { _partition: "Store 51" } }
    );
    console.log(result);
    // :snippet-end:

    expect(result).toEqual(
      // :snippet-start: update-multiple-documents-result
      { matchedCount: 3, modifiedCount: 3 }
      // :snippet-end:
    );
  });
  test("Upsert Documents", async () => {
    const plants = getPlantsCollection();
    // :snippet-start: upsert-documents
    const result = await plants.updateOne(
      {
        // :remove-start:
        _id: new BSON.ObjectId("5f1f63055512f2cb67f460a3"),
        // :remove-end:
        sunlight: "full",
        type: "perennial",
        color: "green",
        _partition: "Store 47",
      },
      { $set: { name: "sweet basil" } },
      { upsert: true }
    );
    console.log(result);
    // :snippet-end:

    expect(result).toEqual(
      // :snippet-start: upsert-documents-result
      {
        matchedCount: 0,
        modifiedCount: 0,
        upsertedId: ObjectId("5f1f63055512f2cb67f460a3"),
      }
      // :snippet-end:
    );
  });
});
describe("Delete Documents", () => {
  test("Delete a Single Document", async () => {
    const plants = getPlantsCollection();
    // :snippet-start: delete-a-single-document
    const result = await plants.deleteOne({ color: "green" });
    console.log(result);
    // :snippet-end:

    expect(result).toEqual(
      // :snippet-start: delete-a-single-document-result
      { deletedCount: 1 }
      // :snippet-end:
    );
  });
  test("Delete Multiple Documents", async () => {
    const plants = getPlantsCollection();
    // :snippet-start: delete-multiple-documents
    const result = await plants.deleteMany({
      _partition: "Store 51",
    });
    console.log(result);
    // :snippet-end:

    expect(result).toEqual(
      // :snippet-start: delete-multiple-documents-result
      { deletedCount: 3 }
      // :snippet-end:
    );
  });
});

describe("Aggregate Documents", () => {
  test("Aggregate Documents in a Collection", async () => {
    const plants = getPlantsCollection();
    // :snippet-start: aggregate-documents-in-a-collection
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
    expect(result).toEqual(
      // :snippet-start: aggregate-documents-in-a-collection-result
      [
        { _id: "annual", total: 1 },
        { _id: "perennial", total: 5 },
      ]
      // :snippet-end:
    );
  });
  test("Paginate documents", async () => {
    const plants = getPlantsCollection();
    // :snippet-start: paginate
    // Paginates through list of plants
    // in ascending order by plant name (A -> Z)
    async function paginateCollectionAscending(
      collection,
      nPerPage,
      startValue
    ) {
      const pipeline = [{ $sort: { name: 1 } }, { $limit: nPerPage }];
      // If not starting from the beginning of the collection,
      // only match documents greater than the previous greatest value.
      if (startValue !== undefined) {
        pipeline.unshift({
          $match: {
            name: { $gt: startValue },
          },
        });
      }
      const results = await collection.aggregate(pipeline);

      return results;
    }
    // Number of results to show on each page
    const resultsPerPage = 3;

    const pageOneResults = await paginateCollectionAscending(
      plants,
      resultsPerPage
    );

    const pageTwoStartValue = pageOneResults[pageOneResults.length - 1].name;
    const pageTwoResults = await paginateCollectionAscending(
      plants,
      resultsPerPage,
      pageTwoStartValue
    );

    // ... can keep paginating for as many plants as there are in the collection
    // :snippet-end:
    expect(pageOneResults.length).toBe(3);
    expect(pageTwoResults.length).toBe(3);
    expect(pageOneResults[0].name).toBe("daffodil");
    expect(pageTwoResults[pageTwoResults.length - 1].name).toBe(
      "wisteria lilac"
    );
  });
});

describe("Aggregation Stages", () => {
  test("Filter Documents", async () => {
    const plants = getPlantsCollection();
    // :snippet-start: filter-documents
    const perennials = await plants.aggregate([
      { $match: { type: { $eq: "perennial" } } },
    ]);
    console.log(perennials);
    // :snippet-end:
    perennials.forEach((plant) => {
      expect(plant.type).toEqual("perennial");
    });
    // prettier-ignore
    expect(perennials).toEqual(
      // :snippet-start: filter-documents-result
      [
        { "_id": ObjectId("5f87976b7b800b285345a8c4"), "_partition": "Store 42", "color": "white", "name": "venus flytrap", "sunlight": "full", "type": "perennial" },
        { "_id": ObjectId("5f87976b7b800b285345a8c6"), "_partition": "Store 42", "color": "green", "name": "thai basil", "sunlight": "partial", "type": "perennial" },
        { "_id": ObjectId("5f87a0dffc9013565c233612"), "_partition": "Store 42", "color": "purple", "name": "wisteria lilac", "sunlight": "partial", "type": "perennial" },
        { "_id": ObjectId("5f87a0dffc9013565c233613"), "_partition": "Store 42", "color": "yellow", "name": "daffodil", "sunlight": "full", "type": "perennial" },
        { "_id": ObjectId("5f1f63055512f2cb67f460a3"), "_partition": "Store 47", "color": "green", "name": "sweet basil", "sunlight": "full", "type": "perennial" }
      ]
      // :snippet-end:
    )
  });

  test("Group Documents", async () => {
    const plants = getPlantsCollection();
    // :snippet-start: group-documents
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
    // :snippet-end:
    expect(result).toEqual(
      // :snippet-start: group-documents-result
      [
        { _id: "annual", numItems: 1 },
        { _id: "perennial", numItems: 5 },
      ]
      // :snippet-end:
    );
  });

  test("Project Document Fields", async () => {
    const plants = getPlantsCollection();
    // :snippet-start: project-document-fields
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
    // :snippet-end:
    // prettier-ignore
    expect(result).toEqual(
      // :snippet-start: project-document-fields-result
      [
        { "name": "venus flytrap", "storeNumber": "42" },
        { "name": "thai basil", "storeNumber": "42" },
        { "name": "helianthus", "storeNumber": "42" },
        { "name": "wisteria lilac", "storeNumber": "42" },
        { "name": "daffodil", "storeNumber": "42" },
        { "name": "sweet basil", "storeNumber": "47" }
      ]
      // :snippet-end:
    )
  });
  test("Add Fields to Documents", async () => {
    const plants = getPlantsCollection();
    // :snippet-start: add-fields-to-documents
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
    // :snippet-end:
    // prettier-ignore
    expect(result).toEqual(
      // :snippet-start: add-fields-to-documents-result
      [
        { "_id": ObjectId("5f87976b7b800b285345a8c4"), "_partition": "Store 42", "color": "white", "name": "venus flytrap", "storeNumber": "42", "sunlight": "full", "type": "perennial" },
        { "_id": ObjectId("5f87976b7b800b285345a8c6"), "_partition": "Store 42", "color": "green", "name": "thai basil", "storeNumber": "42", "sunlight": "partial", "type": "perennial" },
        { "_id": ObjectId("5f87976b7b800b285345a8c7"), "_partition": "Store 42", "color": "yellow", "name": "helianthus", "storeNumber": "42", "sunlight": "full", "type": "annual" },
        { "_id": ObjectId("5f87a0dffc9013565c233612"), "_partition": "Store 42", "color": "purple", "name": "wisteria lilac", "storeNumber": "42", "sunlight": "partial", "type": "perennial" },
        { "_id": ObjectId("5f87a0dffc9013565c233613"), "_partition": "Store 42", "color": "yellow", "name": "daffodil", "storeNumber": "42", "sunlight": "full", "type": "perennial" },
        { "_id": ObjectId("5f1f63055512f2cb67f460a3"), "_partition": "Store 47", "color": "green", "name": "sweet basil", "storeNumber": "47", "sunlight": "full", "type": "perennial" }
      ]
      // :snippet-end:
    )
  });
  test("Unwind Array Values", async () => {
    const plants = getPlantsCollection();
    // :snippet-start: unwind-array-values
    const result = await plants.aggregate([
      { $group: { _id: "$type", colors: { $addToSet: "$color" } } },
      { $unwind: { path: "$colors" } },
      { $sort: { _id: 1, colors: 1 } },
    ]);
    console.log(result);
    // :snippet-end:
    // prettier-ignore
    expect(result).toEqual(
      // :snippet-start: unwind-array-values-result
      [
        { "_id": "annual", "colors": "yellow" },
        { "_id": "perennial", "colors": "green" },
        { "_id": "perennial", "colors": "purple" },
        { "_id": "perennial", "colors": "white" },
        { "_id": "perennial", "colors": "yellow" },
      ]
      // :snippet-end:
    )
  });
});

describe("Watch for Changes", () => {
  test("Watch for Changes in a Collection", async () => {
    const plants = getPlantsCollection();
    try {
      const watching = plants.watch();
      const next = watching.next();
      jest.runOnlyPendingTimers();
      await next;
    } catch (err) {
      expect(err).toEqual({
        type: "aborted",
        message: "The user aborted a request.",
      });
    }
    expect.assertions(1);
    return;
    // NOTE: not sure why, but previously the above code was in a bluehawk start
    // state with the below code in a bluehawk final state and commented out,
    // while only the below code was in the docs.
    // to making running `bluehawk snip easier`, shifting below code into an
    // uncalled function. Probably something to do with the .watch() method interacting
    // weirdly with the Jest unit testing suite.
    async function realExample() {
      // :snippet-start: watch-a-collection
      for await (const change of plants.watch()) {
        switch (change.operationType) {
          case "insert": {
            const { documentKey, fullDocument } = change;
            console.log(`new document: ${documentKey}`, fullDocument);
            break;
          }
          case "update": {
            const { documentKey, fullDocument } = change;
            console.log(`updated document: ${documentKey}`, fullDocument);
            break;
          }
          case "replace": {
            const { documentKey, fullDocument } = change;
            console.log(`replaced document: ${documentKey}`, fullDocument);
            break;
          }
          case "delete": {
            const { documentKey } = change;
            console.log(`deleted document: ${documentKey}`);
            break;
          }
        }
      }
      // :snippet-end:
    }
  });

  test("Watch for Changes in a Collection with a Filter", async () => {
    const plants = getPlantsCollection();
    try {
      const watching = plants.watch({
        filter: {
          operationType: "insert",
          "fullDocument.type": "perennial",
        },
      });
      const next = watching.next();
      jest.runOnlyPendingTimers();
      await next;
    } catch (err) {
      expect(err).toEqual({
        type: "aborted",
        message: "The user aborted a request.",
      });
    }
    expect.assertions(1);
    return;

    // NOTE: not sure why, but previously the above code was in a bluehawk start
    // state with the below code in a bluehawk final state and commented out,
    // while only the below code was in the docs.
    // to making running `bluehawk snip easier`, shifting below code into an
    // uncalled function. Probably something to do with the .watch() method interacting
    // weirdly with the Jest unit testing suite.
    async function docsExample() {
      // :snippet-start: watch-a-collection-with-filter
      for await (const change of plants.watch({
        filter: {
          operationType: "insert",
          "fullDocument.type": "perennial",
        },
      })) {
        // The change event will always represent a newly inserted perennial
        const { documentKey, fullDocument } = change;
        console.log(`new document: ${documentKey}`, fullDocument);
      }
      // :snippet-end:
    }
  });
});
