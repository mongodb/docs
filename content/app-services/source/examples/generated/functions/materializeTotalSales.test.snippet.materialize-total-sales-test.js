const { app_id } = require("../../root_config.json");
const Realm = require("realm");
const { BSON } = require("realm");

let user;
const app = new Realm.App(app_id);
const sandwichId = BSON.ObjectId();
const saladId = BSON.ObjectId();

// utility function
async function sleep(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}
// Set up. Creates and logs in a user, which you need to query MongoDB Atlas
// with the Realm Node.js SDK
beforeEach(async () => {
  const credentials = Realm.Credentials.anonymous();
  user = await app.logIn(credentials);
});
// Clean up. Removes user and data created in the test.
afterEach(async () => {
  const db = user.mongoClient("mongodb-atlas").db("store");
  await db.collection("sales").deleteMany({});
  await db.collection("total_sales_materialized").deleteMany({});
  await app.deleteUser(user);
});

test("Trigger creates a new materialization", async () => {
  const sales = user
    .mongoClient("mongodb-atlas")
    .db("store")
    .collection("sales");

  await sales.insertOne({
    _id: BSON.ObjectId(),
    productId: sandwichId,
    price: 12.0,
    timestamp: Date.now(),
  });

  // give time for the Trigger to execute on Atlas
  await sleep(1000);

  const totalSalesMaterialized = user
    .mongoClient("mongodb-atlas")
    .db("store")
    .collection("total_sales_materialized");
  const allSandwichSales = await totalSalesMaterialized.findOne({
    _id: sandwichId,
  });
  // checks that Trigger increments creates and increments total_sales
  expect(allSandwichSales.total_sales).toBe(1);
});

test("Trigger updates an existing materialization", async () => {
  const sales = user
    .mongoClient("mongodb-atlas")
    .db("store")
    .collection("sales");

  await sales.insertOne({
    _id: BSON.ObjectId(),
    productId: saladId,
    price: 15.0,
    timestamp: Date.now(),
  });
  await sales.insertOne({
    _id: BSON.ObjectId(),
    productId: saladId,
    price: 15.0,
    timestamp: Date.now(),
  });

  // give time for Trigger to execute on Atlas
  await sleep(1000);

  const totalSalesMaterialized = user
    .mongoClient("mongodb-atlas")
    .db("store")
    .collection("total_sales_materialized");
  const allSaladSales = await totalSalesMaterialized.findOne({
    _id: saladId,
  });
  // checks that Trigger increments total_sales for each sale
  expect(allSaladSales.total_sales).toBe(2);
});
