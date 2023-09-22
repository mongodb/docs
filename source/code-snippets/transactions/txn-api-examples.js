import { MongoError, MongoClient } from "mongodb";

// begin-core
async function coreTest(client) {
  const session = client.startSession();
  try {
    session.startTransaction();

    const savingsColl = client.db("bank").collection("savings_accounts");
    await savingsColl.findOneAndUpdate(
      {account_id: "9876"}, 
      {$inc: {amount: -100 }}, 
      { session });

    const checkingColl = client.db("bank").collection("checking_accounts");
    await checkingColl.findOneAndUpdate(
      {account_id: "9876"}, 
      {$inc: {amount: 100 }}, 
      { session });

    // ... perform other operations

    await session.commitTransaction();
    console.log("Transaction committed.");
  } catch (error) {
    console.log("An error occurred during the transaction:" + error);
    await session.abortTransaction();
  } finally {
    await session.endSession();
  }
}
// end-core

// begin-conv
async function convTest(client) {
  let txnRes = await client.withSession(async (session) =>
    session.withTransaction(async (session) => {
      const savingsColl = client.db("bank").collection("savings_accounts");
      await savingsColl.findOneAndUpdate(
        {account_id: "9876"}, 
        {$inc: {amount: -100 }}, 
        { session });
  
      const checkingColl = client.db("bank").collection("checking_accounts");
      await checkingColl.findOneAndUpdate(
        {account_id: "9876"}, 
        {$inc: {amount: 100 }}, 
        { session });

      // ... perform other operations

      return "Transaction committed.";
    }, null)
  );
  console.log(txnRes);
}
// end-conv

async function run() {
  const uri =
    "<connection string>";
  const client = new MongoClient(uri);

  try {
    await coreTest(client);
    await convTest(client);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
