// start-no-error
interface TestType {
  field: { nested: number };
}
const database = client.db("<your db>");
const collection = database.collection<TestType>("<your collection>");
await collection.updateOne({}, { $set: { "field.nested": "A string" } });
// end-no-error
// start-error
interface TestType {
  field: { nested: number };
}
const database = client.db("<your db>");
const collection = database.collection<TestType>("<your collection>");
await collection.updateOne({}, { $set: { field: { nested: "A string" } } });
// end-error
// start-no-key
interface User {
  email: string;
}

const database = client.db("<your database>");
const collection = db.collection<User>("<your collection>");
collection.find({ age: "Accepts any type!" });
// end-no-key
