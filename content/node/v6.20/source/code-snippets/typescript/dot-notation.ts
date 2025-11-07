// start-no-error
interface TestType {
  field: { nested: number };
}
const database = client.db("<your db>");
const myColl = database.collection<TestType>("<your collection>");
await myColl.updateOne({}, { $set: { "field.nested": "A string" } });
// end-no-error
// start-error
interface TestType {
  field: { nested: number };
}
const database = client.db("<your db>");
const myColl = database.collection<TestType>("<your collection>");
await myColl.updateOne({}, { $set: { field: { nested: "A string" } } });
// end-error
// start-no-key
interface User {
  email: string;
}

const database = client.db("<your database>");
const myColl = db.collection<User>("<your collection>");
myColl.find({ age: "Accepts any type!" });
// end-no-key
